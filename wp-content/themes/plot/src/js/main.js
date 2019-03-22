(function (){

    'use strict';

	var $ 	                = require('jquery'),	    
        Sitewide            = require('./sitewide.js'),	    	    
        Carousel            = require('./flexible-content-default/_carousel.js'),
        RevealWordByWord    = require('./components/_reveal-word-by-word.js'), 
        WeirdOnHover        = require('./components/_weird-on-hover.js'), 
        FollowTheMouse      = require('./components/_follow-the-mouse.js'), 
        Modals              = require('./parts/_modals.js'),
        Tickets             = require('./pages/_tickets.js'),        
        FAQs                = require('./pages/_faqs'),

	    Main;

	Main = {

		init: function() {	
            
            Main.createListeners();            

            if ($('.JS--faqCatButton').length > 0){
                FAQs.init();
            }

            
            
        },
        

        createListeners : function(){

            $(document).ready(function () {

                Sitewide.init();
                RevealWordByWord.init();
                FollowTheMouse.init();
                
                if($('.JS--carousel').length > 0){
                    Carousel.init();
                }

                if ($('.JS--magicModal, .psImageGallery').length > 0){
                    Modals.init();
                }

                if ($('.JS--ticketSectionSelector').length > 0) {
                    Tickets.init();
                }


                $('.introSection--link,.sideNavigation--link, .sideNavigation--backToPS a').click(function(e){

                    e.preventDefault();

                    $('html').removeClass('designZone featureZone contactZone');

                    var link = $(this).attr('data-link');
                    var video = document.getElementById("backgroundVideo"); 


                    $('html').addClass(link);

                });


                

            });
        }

	}

	window.Main = Main;

}());
