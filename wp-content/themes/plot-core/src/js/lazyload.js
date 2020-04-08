// LazyLoad for Plot by Jon Mills, Matty Glen & Michael Watson

// This module loads in images asyncronously. It will look for the class
// "JS--lazyLoad" and then look for a data-src on image or video tags. 
// It will then replace the src of that element with the image linked on
// the data attribute.

// If the element is not an image or a video- it will assign the data-src
// as a background image. 

// If the screen size is less than the defined mobileBreakpoint, we load
// the src from data-small-src instead. 

// Creation of these video and image objects can be made using the PHP
// helper in lib/helpers.php plotLazyLoad()

// If we need to stipulate the height of an image before it loads, to avoid
// any jumpiness, we can pass through a ratio (w/h) of the image so it's
// set before the image loads.

// We also handle autoplaying videos, if the video has an autoplay attribute.
// It will pause and play videos appropriately depending on if they're in
// view or not.

(function(){

    var LazyLoad

    LazyLoad = {
        mobileBreakpoint : 640,
        images :           document.querySelectorAll('.JS--lazyLoad'),
        config : {
            rootMargin: '0px',
            threshold: 0.01
        },
        observer : null,
        init : function(){ 

            LazyLoad.observer = new IntersectionObserver(LazyLoad.handleImageLoad, LazyLoad.config)

            LazyLoad.loadImages()
            
        },

        loadImages : () => { 

            LazyLoad.images.forEach( image => {  

                LazyLoad.observer.observe(image)
            })
                
        },

        addElements : elements => {

            return new Promise(function(resolve,reject){

                elements.forEach( image => {       
                    LazyLoad.observer.observe(image)
                })

                resolve()

            })
        },

        handleImageLoad : entries => {                        

            entries.forEach( entry => {
                
                let element = entry.target
                
                if(!element.classList.contains('loaded') && !element.classList.contains('loading')) { 

                    if(!entry.isIntersecting)
                        return
                    
                    element.classList.add('loading')

                    var tag = entry.isIntersecting && element.tagName

                    let src = element.dataset.src

                    if(LazyLoad.isSmallScreen() && element.dataset.smallSrc) {

                        src = element.dataset.smallSrc

                    }
                                
                    if(tag == "VIDEO") {

                        if(LazyLoad.isSmallScreen() && element.dataset.smallSrc) {

                            element.src = element.dataset.smallSrc

                        } else {

                             element.src = element.dataset.src

                             if(element.getAttribute('autoplay'))
                                 element.play()
                         
                        }

                        element.classList.add('loaded')

                    } else {

                        LazyLoad.getImage(src, element).then( data => {

                            let tag = element.tagName

                            if(tag == "IMG") {

                                data.element.src = data.src

                            } else {

                                data.element.style.backgroundImage = 'url(' + data.src + ')'

                            }

                            data.element.classList.add('loaded')
                            data.element.classList.remove('loading')

                        }).catch( erroredSrc =>{

                            console.log(erroredSrc, 'image not found')

                        })

                    }

                } else {

                    if(element.tagName == "VIDEO") 

                        if(element.getAttribute('autoplay')) 

                            if(!entry.isIntersecting && element.paused == false) 

                                element.pause()

                            else

                                element.play()

                }

            })
        },

        getImage: (src, element) => {

            return new Promise(function(resolve,reject){

                var img = new Image()

                img.onload = () => {

                    resolve({
                        src: src,
                        element: element
                    })

                }

                img.onerror = () => {

                    reject({
                        src: src,
                        element: element
                    })
                }

                img.src = src
            })

        },

        isSmallScreen : () => {

            if(window.innerWidth < LazyLoad.mobileBreakpoint)
                return true
            

            return false

        }


    }

    module.exports = LazyLoad

})()

