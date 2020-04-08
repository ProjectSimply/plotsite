(function () {

    var Flickity        = require('flickity'),
    LazyLoad            = require('./lazyload'),
    Carousels

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
                        pageDots    : false
                    })

                }

            });

            
        },

    }

    module.exports = Carousels

}())
