(function () {

    'use strict';

    var $ = require('jquery'),
        Slick = require('slick-carousel'),
        Carousel;

    Carousel = {

        element: $('.JS--carousel'),
        video: $('.carousel__video').length > 0 ? $('.carousel__video') : null,

        init: function () {

            var self = this;

            Carousel.initialiseCarousel();
            Carousel.createListeners();

            // slick.js doesn't autoplay videos, so we have to manually check and play them
            if (Carousel.video != null) {
                Carousel.playCarouselVideo();
            }

        },

        createListeners: function () {

            Carousel.element.on('afterChange', function (event, slick, currentSlide, nextSlide) {

                if (Carousel.video != null) {
                    Carousel.playCarouselVideo();
                }
            });

        },


        initialiseCarousel: function () {

            Carousel.element.slick({
                autoplay: true,
                speed: 1200,
                autoplaySpeed: 7000
            });
        },


        playCarouselVideo: function () {

            // pause currently playing video
            Carousel.element.find(Carousel.video).get(0).pause();

            // if the active slide has a video, play it
            if ($('.slick-active').find(Carousel.video).length > 0) {
                $('.slick-active').find(Carousel.video).get(0).play();
            }
        }

    }

    module.exports = Carousel;

}());
