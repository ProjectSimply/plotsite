(function (){

    'use strict'

	var Plot    		= require('../../../plot-core/src/js/plot'),  
		LazyLoad   	 	= require('../../../plot-core/src/js/lazyload'),
		Modals			= require('../../../plot-core/src/js/modals'),
		Carousels		= require('./components/carousel'),
		Smooth 			= require('../../../plot-core/src/js/plot-smooth-scroll'),
		// CustomMouse 	= require('../../../plot-core/src/js/custom-mouse'),
		Home			= require('./pages/home'),
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

		},
		
		initalizeSmooth : () => {

        	const hasSmoothScroll = document.body.dataset.plotCustomizerSmoothScroll

        	const smoothSettings = {
				standardScroll  : hasSmoothScroll != 'yes'
			}

        	Smooth.init(smoothSettings)

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
 