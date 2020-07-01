(function () {

    var Flickity        = require('flickity'),
    LazyLoad   	 	    = require('../../../../plot-core/src/js/lazyload'),
    Carousels

    require('flickity-imagesloaded')

    Carousels = {

        init: () => {

            Carousels.initialiseCarousel()

        },

        initialiseCarousel  : () => {

            var carousels = document.querySelectorAll('.JS--carousel')

            carousels.forEach(carousel => { 

                var slides = carousel.querySelectorAll('.JS--carousel__slideWrap')

                if(slides.length > 1) {

                    var flkty = new Flickity(carousel, {
                        cellAlign   : 'center',            
                        wrapAround  : true,
                        autoPlay    : false,
                        imagesLoaded: true,
                        pageDots    : false,
                        prevNextButtons: true,
                        lazyLoad: 2
                    })
                }

                carousel.classList.remove('JS--carousel--hidden');

            });

            
        },

    }

    module.exports = Carousels

}())
