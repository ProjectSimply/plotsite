(function () {

    var Flickity        = require('flickity'),
    Carousels

    Carousels = {

        init: () => {

            Carousels.initialiseCarousel()

        },

        initialiseCarousel  : () => {

            var carousels = document.querySelectorAll('.JS--carousel')

            carousels.forEach(carousel => {

                var settings = {
                        cellAlign   : 'center',            
                        wrapAround  : true,
                        autoPlay    : false,
                        imagesLoaded: true,
                        pageDots    : false
                    }

                var slides = carousel.querySelectorAll('.JS--carousel__slideWrap')

                if(carousel.dataset.plotCarouselType == 'image') {
                    settings = {
                        cellAlign   : 'center',  
                        lazyLoad : 2,
                        wrapAround  : true,
                        pageDots : false
                    }
                }

                if(slides.length > 1) {

                    var flkty = new Flickity(carousel, settings)

                }

            });

            
        },

    }

    module.exports = Carousels

}())
