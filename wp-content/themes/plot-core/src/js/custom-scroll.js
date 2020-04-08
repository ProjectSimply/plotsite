(function () {

  var Smooth;

  Smooth = {

    observer : null,

    visibleScrollElements : [],

    mainScrollAnimationFrame : null,

    height : window.innerHeight,

    width : window.innerWidth,

    currentPosition : 0,

    ease : 0.1,

    lastPosition : 0,

    onScroll : null,

    dom : {
            scrollWrap      : document.querySelector('[data-scroll]'),
            scrollElement   : document.querySelector('[data-scroll-content]'),
            trackedElements : document.querySelectorAll('[data-animate-on-scroll]')
          },

    init: (settings) => {

      Smooth.createEventListeners()

      if(settings.onScroll) {
        Smooth.onScroll = settings.onScroll
      }

      Smooth.observer = new IntersectionObserver(Smooth.trackVisibleElements, {rootMargin: '0px',threshold: 0.01})
      Smooth.addElements(Smooth.dom.trackedElements)

      Smooth.setHeight()
      Smooth.setStyles()

      Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)

    },

    createEventListeners : () => {
      window.addEventListener('resize', Smooth.resize, { passive: true })
      window.addEventListener('scroll', Smooth.scroll, { passive: true })
    },

    addElements : (elements) => {

      return new Promise(function(resolve,reject){

            elements.forEach( element => {       
                Smooth.observer.observe(element)
            })

            resolve()

      })

    },

    trackVisibleElements : (entries) => {
       
        entries.forEach( entry => {

          var includedAlready = false

          Smooth.visibleScrollElements.forEach((data, i) => {

            if(data.element == entry) 
              includedAlready = i

          })

          if(entry.isIntersecting) 

            if(includedAlready === false)
              Smooth.visibleScrollElements.push({element : entry.target,position : 0})

           else 

            if(includedAlready !== true)
              Smooth.visibleScrollElements.splice(includedAlready,1)

        })
    },

    resize : () => {
      Smooth.setHeight()
      Smooth.scroll()
    },

    offsetTop : (el) => {

      var offsetLeft = 0,
      offsetTop = 0

      do{
          offsetLeft += el.offsetLeft;
          offsetTop  += el.offsetTop;
    
          el = el.offsetParent;
      } while( el );

      return offsetTop

    },

    run : () => {

      Smooth.lastPosition = Smooth.lerp(Smooth.lastPosition, Smooth.currentPosition, Smooth.ease)

      if (Smooth.lastPosition < .1) {
        Smooth.lastPosition = 0
      }
      
      const diff = Smooth.currentPosition - Smooth.lastPosition

      if(Math.abs(diff) > 0.01) {

        const acc = diff / Smooth.width
        var velocity =+ acc
        
        Smooth.dom.scrollElement.style.transform = `translate3d(0, -${Smooth.lastPosition}px, 0)`

        if(Smooth.onScroll) {
          Smooth.visibleScrollElements.forEach((entry,index) => {

            var lowestPoint = -entry.element.getBoundingClientRect().height
            var heightPoint = Smooth.height
            var range = heightPoint - lowestPoint
            var position = Smooth.offsetTop(entry.element) - Smooth.lastPosition

            var offSetPosition = position - lowestPoint

            var betweenzeroandone = offSetPosition / range
            var betweenminus1and1 = betweenzeroandone * 2 - 1

            Smooth.visibleScrollElements[index].position = betweenminus1and1
          })
          Smooth.onScroll({
            velocity : velocity,
            visibleScrollElements : Smooth.visibleScrollElements
          })
        }

      }

      Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)
      

    },

    scroll : () => {
      Smooth.currentPosition = window.scrollY
    },

    setHeight : () => {

      document.body.style.height = `${Smooth.dom.scrollWrap.scrollHeight}px`
     
    },

    setStyles : () => {

      Object.assign(Smooth.dom.scrollWrap.style,{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      })

    },

    lerp: (a,b,n) =>  {

        return (1 - n) * a + n * b

    }

  }

  module.exports = Smooth

}())