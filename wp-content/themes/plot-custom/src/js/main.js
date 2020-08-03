(function (){

    'use strict'

	var Plot    		= require('../../../plot-core/src/js/plot'),  
		LazyLoad   	 	= require('../../../plot-core/src/js/lazyload'),
		Modals			= require('../../../plot-core/src/js/modals'),
		Carousels		= require('../../../plot-core/src/js/carousels'),
		Smooth 			= require('../../../plot-core/src/js/plot-smooth-scroll'),
		FAQs 			= require('../../../plot-core/src/js/faqs'),
		// CustomMouse 	= require('../../../plot-core/src/js/custom-mouse'),
		Home			= require('./pages/home'),
		RollerText      = require('./components/roller-text'),
		TogglePrice     = require('./components/toggle-price'),
		Artists			= require('./pages/artists'),
		Schedule		= require('./pages/schedule'),
		News 			= require('./pages/news'),
	    Main

	Main = {

		init: () => {	

			Main.initalizeSmooth()

			Plot.init() 
			LazyLoad.init()
			Modals.init()  
			Carousels.init()
			FAQs.init()
			RollerText.init()
			Main.fireConversionSnippetsIfOnThankYouPage()
			// CustomMouse.init({
			// 	'a' 				: 'anchorHover',
			// 	'.altHoverTarget'	: 'altHover'
			// })


			//Pages
        	if(Plot.isPage('home'))
				Home.init()

        	if(Plot.isPage('schedule'))
				Schedule.init()

        	if(Plot.isPage('artists'))
				Artists.init()

			if(Plot.isPage('pricing'))
				TogglePrice.init()

			News.init()
			
			Main.demoAjaxButton() 

		    if (typeof(window.HubSpotConversations) != 'undefined') {
			    Main.hubspot();
		  	} else {
		    	window.hsConversationsOnReady = [Main.hubspot];
		  	}

		},
		
		initalizeSmooth : () => {

        	const hasSmoothScroll = document.body.dataset.plotCustomizerSmoothScroll

        	const smoothSettings = {
				standardScroll  : hasSmoothScroll != 'yes'
			}

        	Smooth.init(smoothSettings)

        },

        fireConversionSnippetsIfOnThankYouPage : () => {

        	const urlParams = new URLSearchParams(window.location.search);
			const trackingCode = urlParams.get('code');


        	if(gtag && trackingCode) {
        		console.log('ping',trackingCode)
    		 	gtag('event', 'conversion', {'send_to': 'AW-619032347/' + trackingCode})
    		 }

        },

        formIsSubmitted : () => {

        	var errVal = document.querySelectorAll('.input-error').length
		    if (errVal === 0) { 
		      	gtag('event', 'conversion', {'send_to': 'AW-619032347/y-G1CMOputkBEJvelqcC'});
		    }  else {
		    }

        },

        checkPopUpFormExists : () => {

        	const form = document.querySelector('#hsPopUpForm-73ee3ecf-7f8a-42c6-9dcc-725c7c8661a2')

        	if(!form) {
        		setTimeout(function(){
        			Main.checkPopUpFormExists()

        		},500)
        	} else {
	          form.onsubmit = function () {

	          	console.log('converted')
	          	Main.formIsSubmitted()

	          }
        	}

        },

        hubspot : () => {

        	Main.checkPopUpFormExists()

    		window.HubSpotConversations.on('conversationStarted', payload => {

    		 if(gtag) {
    		 	gtag('event', 'conversion', {
				      'send_to': 'AW-619032347/Y9ujCPyD1dkBEJvelqcC'
				  })
    		 }
			 

			})

        },

        demoAjaxButton : () => {

			var plotDemoLoadContent =  document.querySelector('.JS--plotLoadTemplatePartDemo');
			

			if(plotDemoLoadContent)

				plotDemoLoadContent.addEventListener('click', e => {

					// Take a look at what you can pass to this function
					// var args = {
				    //              templatePart    : null,
				    //              action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
				    //              data            : {}, //Any data we'd like to pass to the template part. 
				    //              contentArea     : '.JS--ajaxTargetArea', //Where the new content gets inserts
				    //              append          : false //If we want to append to the above area, or replace the content
				    //          }

					const args = {

						templatePart : 'demos/ajax-content', 
						data : {
							'foo' 		: 'bar',
							'bangers'	: 'mash',
							'having'	: 'it'
						}
					}


					Plot.loadTemplatePart(args)

				})

        }

	}

	window.Main = Main

}());
 