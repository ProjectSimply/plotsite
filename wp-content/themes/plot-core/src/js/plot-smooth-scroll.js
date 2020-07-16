(function () {

  var Smooth;

  Smooth = {

    trackedElementsObserver : null,
    standardScrollFramesObserver : null,

    mainScrollAnimationFrame : null,

    currentPosition : 0,

    mutationObserverDebounce : null,

    onScrollCallbackThrottler : null,

    ease : 0.07,

    lastPosition : 0,

    onScroll : null,

    standardScroll : false,

    scrollElements : [],

    topBarHeight : 0,

    scrollFrames : [],

    ticking : false,

    dom : {
            scrollWindow                            : document.querySelector('[data-plot-smooth-scroll]'),
            scrollFrames                            : document.querySelectorAll('[data-plot-smooth-scroll-frame]'),
            scrollElements                          : document.querySelectorAll('[data-plot-smooth-scroll-element]'),
            topBar                                  : document.querySelector('[data-plot-smooth-scroll-topbar')
          },

    windowHeight : window.innerHeight, 

    windowWidth : window.innerWidth,

    init: settings => {

      //override any default settings with passed parameters
      Smooth.setSettings(settings)

      if(!Smooth.standardScroll) {

        //Set our current and last positions 
        //to the current scroll Y position, in case
        //we are scrolled down the page on load
        Smooth.currentPosition    = window.scrollY
        Smooth.lastPosition       = window.scrollY

        //Put fixed onto the whole site ready to 
        //intercept scrolling
        Smooth.setStyles()

        window.addEventListener('resize', Smooth.refresh, { passive: true })
        window.addEventListener('scroll', Smooth.scroll, { passive: true })

        //Read through each scroll frame and set data
        //into a single array for processing later
        //{
        //      element           : element,      (the dom element)
        //      top               : 100,          (the offset top value without transforms, in pixels)
        //      height            : 300,          (the height of the element without transforms, in pixels)
        //      bottom            : 400,          (the offset bottom position value without transforms, in pixels)
        //      sticky            : false,        (if the element should behave like CSS sticky or not)
        //      parentBottom      : false || 500  (if the element is sticky, return the bottom position of its parent in pixels (when it should unstick))
        //  }
        Smooth.setScrollFrameData()

      }

      //If any scroll elements exist, we can add them and monitor them
      if(Smooth.dom.scrollElements) {
        //Read through each scroll element and set data
        //into a single array for processing later
        //{
        //      element         : element,          (the dom element)
        //      top             : 100,              (the offset top value without transforms, in pixels)
        //      height          : 300,              (the height of the element without transforms, in pixels)
        //      bottom          : 400,              (the offset bottom position value without transforms, in pixels)
        //      isVisible       : false,            (if the element is currently in the window frame or not)
        //      initialOffset   : .2,               (how far away this element is from the initial center of the screen)
        //      currentPosition : 0                 (how far up the viewport this element currently is (between -1 and 1))
        //      callback        : 'function.name'   (the name of a function you can call when this moves within view)
        // }
        Smooth.trackedElementsObserver = new IntersectionObserver(Smooth.trackVisibleElements, {rootMargin: '200px',threshold: 0.01})
        Smooth.setScrollElementData()
      }

      //Set up a mutation observer to listen out for changes in height,
      //to adjust our height of document accordingly
      Smooth.initMutationObserver()

      //If there's a fixed topbar on this site, we can set the height
      //here, in order to offset any sticky positions. 
      Smooth.setTopBarHeight()

      //If it's not standard scroll, set our initial scroll frame positions
      if(!Smooth.standardScroll) {
        Smooth.setPositionOfFrames()
      } else {
         Smooth.standardScrollFramesObserver = new IntersectionObserver(Smooth.trackStandardScrollFrames, {rootMargin: '0px',threshold: 0.01})
         for(let frame of Smooth.dom.scrollFrames) {
            Smooth.standardScrollFramesObserver.observe(frame)
         }
      }

      //Set our position of any scroll elements
      Smooth.positionScrollElements()

    },

    setSettings : settings => {

      if(!settings)
        return true

      if(typeof(settings.onScroll) == 'function')
        Smooth.onScroll = settings.onScroll
      
      if(settings.standardScroll == true)
        Smooth.standardScroll = true

      if(settings.ease) 
        Smooth.ease = settings.ease
      
    },

    retriggerWindowSizeOnMutate : (mutationsList, observer) => { 

      if(!Smooth.mutationObserverDebounce) {

        Smooth.mutationObserverDebounce = setTimeout(function(){

            var changed = false

            Smooth.scrollFrames.forEach(frame => {
                if(frame.height != frame.element.clientHeight)
                  changed = true
            })

            if(changed == true) 
              Smooth.refresh()
            
            clearTimeout(Smooth.mutationObserverDebounce)
            Smooth.mutationObserverDebounce = null

        },200)

      }

    },

    initMutationObserver : () => {

      for(var scrollFrame of Smooth.dom.scrollFrames) {

        const observer = new MutationObserver(Smooth.retriggerWindowSizeOnMutate)
        observer.observe(scrollFrame, {
          childList   : true,
          attributes  : true,
          subtree     : true
        })
      }

    },

    destroy : () => {

      Smooth.scrollElements.forEach(entry =>{
        entry.element.removeAttribute('style')
      })

      Smooth.scrollFrames.forEach(entry =>{
        entry.element.removeAttribute('style')
      })

      Smooth.trackedElementsObserver = null
      Smooth.mainScrollAnimationFrame = null
      Smooth.currentPosition = 0
      Smooth.mutationObserverDebounce = null
      Smooth.onScrollCallbackThrottler = null
      Smooth.ease = 0.07
      Smooth.lastPosition = 0
      Smooth.onScroll = null
      Smooth.standardScroll = false
      Smooth.scrollElements = []
      Smooth.topBarHeight = 0
      Smooth.scrollFrames = []
      Smooth.ticking = false
      Smooth.dom.scrollWindow.removeAttribute('style')

    },

    addElements : (elements) => {

      return new Promise(function(resolve,reject){

            elements.forEach( element => {       
                Smooth.trackedElementsObserver.observe(element)
            })

            resolve()

      })

    },

    scrollTo : (element) => {
      
      window.scrollTo(0,Smooth.exactPositionOfElement(element) - 100)

      if(Smooth.standardScroll != false) {
        Smooth.ticking = true
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)
      }
    },

    setScrollElementData : () => {

      Smooth.dom.scrollElements = document.querySelectorAll('[data-plot-smooth-scroll-element]')
      Smooth.addElements(Smooth.dom.scrollElements) 

      if(!Smooth.dom.scrollElements)
        return false

      Smooth.scrollElements = []
    
      Smooth.dom.scrollElements.forEach( (element,i) => {

        const elementTop = Smooth.exactPositionOfElement(element)

        var height = element.clientHeight

        var callback  = false,
            fromValue = -1,
            toValue   = 1

        //Is anything set on this element as a callback?
        if(element.dataset.plotSmoothScrollElement) {

          let c = element.dataset.plotSmoothScrollElement

          //First up - have values been passed to this callback in this form: callback(2,5)
          let values = c.substring( c.indexOf( '(' ) + 1, c.indexOf( ')' ) )
          values = values.split(',')

          //Valid if we have 2, and from is less that to value
          if(values.length == 2 && values[0] < values[1]) {
            fromValue = Number(values[0])
            toValue = Number(values[1])
          }

          let potentialFunction = window[c]

          if (typeof potentialFunction === "function") {

            callback = potentialFunction.replace(/\s*\(.*?\)\s*/g, '')

          }
          else {

            const callbackSplit = c.replace(/\s*\(.*?\)\s*/g, '').split('.')

            if(callbackSplit.length == 2) {

              potentialFunction = window[callbackSplit[0]][callbackSplit[1]]

              if (typeof potentialFunction === "function") {
                callback = potentialFunction
              } 
            }
          }
        }

        var initialOffset = 0

        if(elementTop < Smooth.windowHeight)
          initialOffset = (elementTop + height) / (Smooth.windowHeight + height) * (toValue - fromValue) + fromValue


        
        Smooth.scrollElements[i] = {
            element         : element,
            top             : elementTop,
            height          : height,
            bottom          : elementTop + element.clientHeight,
            isVisible       : elementTop < Smooth.currentPosition + Smooth.windowHeight && elementTop + height > Smooth.currentPosition,
            initialOffset   : initialOffset,
            callback        : callback,
            fromValue       : fromValue,
            toValue         : toValue,
            currentPosition : 0
        }

        element.dataset.plotSmoothScrollElementId = i

      })


    },

    setTopBarHeight : () => {

      if(Smooth.dom.topBar)
        Smooth.topBarHeight = Smooth.dom.topBar.clientHeight

    },

    setScrollFrameData : () => {

      Smooth.dom.scrollFrames = document.querySelectorAll('[data-plot-smooth-scroll-frame]')

      Smooth.scrollFrames = []
      var newHeight = 0

      Smooth.dom.scrollFrames.forEach( element => {

        const elementTop = Smooth.exactPositionOfElement(element)

        Smooth.scrollFrames.push({
            element           : element,
            top               : elementTop,
            height            : element.clientHeight,
            bottom            : elementTop + element.clientHeight,
            sticky            : typeof(element.dataset.plotSmoothScrollSticky) != 'undefined' ? true : false, 
            parentBottom      : element.parentElement ? Smooth.exactPositionOfElement(element.parentElement) + element.parentElement.getBoundingClientRect().height : false
        })

      })

      document.body.style.height = `${Smooth.dom.scrollWindow.scrollHeight}px`

    },

    trackVisibleElements : (entries) => {
       
        entries.forEach( entry => {

          if(entry.isIntersecting && entry) {
            entry.target.classList.add('plotSmoothScrollInView','plotSmoothScrollSeenOnce')
          }
          else {
            entry.target.classList.remove('plotSmoothScrollInView')
          }

          if(Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId])
            Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId].isVisible = entry.isIntersecting


        })
    },

    trackStandardScrollFrames : (entries) => {
       
        entries.forEach( entry => {

          if(entry.isIntersecting && entry) {
            entry.target.classList.add('plotSmoothScrollFrameInView','plotSmoothScrollFrameSeenOnce')
          }
          else {
            entry.target.classList.remove('plotSmoothScrollFrameInView')
          }

        })
    },

    refresh : () => {
      if(Smooth.standardScroll)
        return true
      
      Smooth.windowHeight = window.innerHeight
      Smooth.windowWidth = window.innerWidth
      Smooth.setScrollElementData()
      Smooth.setScrollFrameData()
      Smooth.setTopBarHeight()
      Smooth.scroll()
    },

    run : () => {

      Smooth.lastPosition = Smooth.lerp(Smooth.lastPosition, Smooth.currentPosition, Smooth.ease)

      if (Smooth.lastPosition < .1)
        Smooth.lastPosition = 0
     
      let diff = Smooth.currentPosition - Smooth.lastPosition

      if(Math.abs(diff) < 0.5) {
        Smooth.ticking = false
        diff = 0
      }

      var velocity = diff / Smooth.windowWidth

      Smooth.setPositionOfFrames()

      Smooth.fireOnScrollEvent(velocity)

      Smooth.positionScrollElements()

      if(Smooth.ticking == true)
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)
      

    },

    positionScrollElements : () => {

      Smooth.scrollElements.forEach(entry => {

          if(entry.isVisible == true && entry.callback) {

            const currentPosition = (entry.top - Smooth.lastPosition + entry.height) / (Smooth.windowHeight + entry.height) * (entry.toValue - entry.fromValue) + entry.fromValue - entry.initialOffset
            
            if(entry.currentPosition != currentPosition) {

              entry.currentPosition = currentPosition

              entry.callback(entry.element,currentPosition)

            }

          }
        

        })

    },

    fireOnScrollEvent : (velocity) => {

      if(typeof(Smooth.onScroll) == 'function')
              
        if(Smooth.onScrollCallbackThrottler === null) {

          Smooth.onScrollCallbackThrottler = setTimeout(function(){

            Smooth.onScroll(Smooth.dom.scrollFrames,velocity)
            Smooth.onScrollCallbackThrottler = null

          },50)

        }

    },

    setPositionOfFrames : () => {

      for(var scrollFrame of Smooth.scrollFrames) {

          var windowScrollPosition = Smooth.lastPosition

          if(scrollFrame.sticky && scrollFrame.parentBottom) {
            windowScrollPosition = Smooth.calcPositionOfStickyElement(scrollFrame, windowScrollPosition)
          }

          if(windowScrollPosition > scrollFrame.bottom || windowScrollPosition + Smooth.windowHeight < scrollFrame.top) {
            scrollFrame.element.classList.remove('plotSmoothScrollFrameInView')
            
          } else {
            scrollFrame.element.classList.add('plotSmoothScrollFrameInView','plotSmoothScrollFrameSeenOnce')
            scrollFrame.element.style.transform = `translate3d(0, -${windowScrollPosition}px, 0)`
          }

        }

    },

    scroll : () => {
      Smooth.currentPosition = window.scrollY
      if(Smooth.ticking == false) {
        Smooth.ticking = true
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run) 
      }
    },

    setStyles : () => {

      Object.assign(Smooth.dom.scrollWindow.style,{
        position  : 'fixed',
        top       : 0,
        left      : 0,
        height    : '100%',
        width     : '100%',
        overflow  : 'hidden'
      })

    },

    calcPositionOfStickyElement : (entry, position) => {

      //If the item is below the bottom of it's parent
      if(position + Smooth.topBarHeight >= entry.parentBottom)
        return position
      

      if(entry.parentBottom - position - Smooth.topBarHeight <= entry.height) {
        return entry.top - entry.parentBottom + position + entry.height
      }

      if(position + Smooth.topBarHeight > entry.top) 
        return entry.top - Smooth.topBarHeight   


      return position

    },

    lerp: (a,b,n) =>  {

        return (1 - n) * a + n * b

    },

    exactPositionOfElement : (element) => {
      var el = element,
      offsetTop  = 0;

      do{
          offsetTop  += el.offsetTop;

          el = el.offsetParent;
      } while( el );

      return offsetTop

    }

  }

  module.exports = Smooth

}())