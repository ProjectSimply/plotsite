(function (){

    'use strict';
    
    var $ 		        = require('jquery'),
        imagesLoaded    = require('imagesloaded'),
	    Sitewide;

	Sitewide = {

        window  : $(window),
        body    : $('body'),
        resizeThrottle  : false,

		init: function() {
			
            var self = this;
            
            imagesLoaded.makeJQueryPlugin($); 

			Sitewide.createListeners();	
		},

		createListeners : function(){

            $('body').imagesLoaded({}, function () {
                Sitewide.checkScrollItems($(window).scrollTop());
            });

			$('.JS--menuTrigger').on('click', function(e){
				e.preventDefault();
				$('body').toggleClass('menuOpen');
            });
            

			$('.JS-scrollTo').on('click', function(e){
				e.preventDefault();
				Sitewide.scrollToElement($(this));
            });	

            
            Sitewide.window.resize(function () {

                clearInterval(Sitewide.resizeThrottle);

                Sitewide.resizeThrottle = setTimeout(function () {

                    console.log('throttled resize...');

                }, 500);

            });


            Sitewide.window.on('scroll', function () {

                Sitewide.toggleScrollClass();
                Sitewide.checkParallaxItems($(window).scrollTop());
                Sitewide.checkScrollItems($(window).scrollTop());                

            }); 


            Sitewide.checkParallaxItems($(window).scrollTop());

        },


        checkParallaxItems : function(scroll) {

            var bottomOfWindow = scroll + $(window).height();

            if($(window).width() > 640) {

                $('.parallaxItem').each(function(){

                    if ($(this).offset().top < bottomOfWindow && $(this).offset().top + $(this).height() > scroll - 400) {

                        var windowHeight = $(window).height();
                        var elementPosition = $(this).offset().top - scroll;
                        var parallaxAmount = $(this).attr('data-parallax-amount');
                        var p = elementPosition/windowHeight * parallaxAmount - (parallaxAmount/2);
                        $(this).css({'transform':'translateY(' + p + 'px)'}).addClass('revealed');

                    }

                });
            } else {
                $('.parallaxItem').attr('style','');
            }

        },
        

		scrollToElement : function(elem){
				
			var target 	= elem.attr('href');

			$('html, body').animate({
				scrollTop: $("#" + target).offset().top
			}, 500);
        },
        

        toggleScrollClass: function () {

            if (Sitewide.window.scrollTop() > 30) {
                Sitewide.body.addClass('weAmScrolled');
            } else {
                Sitewide.body.removeClass('weAmScrolled');
            }
        },


        checkScrollItems: function (scroll) {

            var bottomOfWindow = scroll + $(window).height();

            $('.scrollItem').each(function () {

                if ($(this).offset().top < bottomOfWindow && $(this).offset().top + $(this).height() > scroll - 400) {
                    $(this).addClass('revealed');
                }
                else {
                     $(this).removeClass('revealed');
                }

            });

        }
        
    }
    
    module.exports = Sitewide;
	
}());
