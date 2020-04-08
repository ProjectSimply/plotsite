(function (){

    'use strict'

	var Plot    			= require('../../../plot-core/src/js/plot'),  
		LazyLoad   	 		= require('../../../plot-core/src/js/lazyload'),
		Modals				= require('../../../plot-core/src/js/modals'),
		Carousels			= require('../../../plot-core/src/js/carousels'),
		Home				= require('./pages/home'),
		Artists				= require('./pages/artists'),
		PossibleDropdowns 	= require('./features/possible-dropdowns'),
		TextLineup 			= require('./features/text-lineup'), 
		Schedule			= require('./pages/schedule'),
		News 				= require('./pages/news'),
	    Main

	Main = {

		bannerElement : document.querySelector('.banner'),

		init: () => {	

			Plot.init() 
			LazyLoad.init()
			Modals.init()  
			Carousels.init()

			//Pages
        	if(Plot.isPage('home'))
				Home.init()

        	if(Plot.isPage('schedule'))
				Schedule.init()

        	if(Plot.isPage('artists'))
				Artists.init()

			News.init()

			Main.detectIfMobileMenuNeeded()

			window.addEventListener('resize', Main.detectIfMobileMenuNeeded, { passive: true })

			Main.seeIfBannerShouldBeShuntedDown()

			window.addEventListener('resize', Main.seeIfBannerShouldBeShuntedDown, { passive: true })

			Main.adjustSpacingForLayouts()
			Main.dropdownMenus()

			PossibleDropdowns.init()
			TextLineup.init()
	    		
        },

        dropdownMenus : () => {

        	var dropdownMenuItems = document.querySelectorAll('.siteMainHeader__desktop-menu .menu-item-has-children')

        	for(var dropdownMenuItem of dropdownMenuItems) {

        		dropdownMenuItem.addEventListener('mouseenter', function(){
				        this.classList.add('subnavigationOpen')
				})

				dropdownMenuItem.addEventListener('mouseleave', function(){
				        this.classList.remove('subnavigationOpen')
				})

        	}

        	var burgerDropdownMenuItems = document.querySelectorAll('#burgerMenu .menu-item-has-children')

        	for(var burgerDropdownMenuItem of burgerDropdownMenuItems) {

        		burgerDropdownMenuItem.addEventListener('click', function(event){

        			if(!event.target.closest('a'))
	        			if(this.classList.contains('subnavigationOpen'))
	        				this.classList.remove('subnavigationOpen')
	        			else
					        this.classList.add('subnavigationOpen')
				})

        	}

        },

        adjustSpacingForLayouts : () => {

        	const layouts = document.querySelectorAll('.plotLayout')
        	const banner = document.querySelector('.banner')
        	let previousBackground = 'normal'
        	let wasPreviousFullScreenImage = false
        	let i = 0

        	for(var layout of layouts) {

        		if(previousBackground == 'normal')
    				layout.classList.add('lastLayoutWasNormal')
    			else 
    				layout.classList.add('lastLayoutWasAlternativeColor')
    			
        		previousBackground = layout.classList.contains('altColourScheme') ? 'alt' : 'normal'

        		if(wasPreviousFullScreenImage) {
        			layout.classList.add('lastLayoutWasFullWidth')
        		}

        		wasPreviousFullScreenImage = (layout.classList.contains('fullImageOrVideo') && !layout.classList.contains('hasMaxWidth')) || layout.classList.contains('carousel')
        		
        		i++

        		if(i == layouts.length) 
        			layout.classList.add('lastLayout')

        		if(i == 1 && !banner.classList.contains('textOnlyBanner'))
        			layout.classList.add('firstLayout')
        	}

        },

        seeIfBannerShouldBeShuntedDown : () => {

        	if(Main.bannerElement) {

	        	if(document.body.dataset.plotSolidHeader == 'true' || Main.bannerElement.classList.contains('textOnlyBanner') || Main.bannerElement.classList.contains('maxWidth')) {

	        		Main.bannerElement.style.paddingTop = `${document.querySelector('#siteMainHeader').clientHeight}px` 

	        	} else {

	        		Main.bannerElement.style.paddingTop = 0
	        	}

	        }

        	document.body.classList.add('revealed')

        },

        detectIfMobileMenuNeeded : () => {

        	if(document.body.dataset.plotCustomizerNavigationType == "mobileBurger") {

	        	var headerElements

	        	const navigationAlignment = document.body.dataset.plotCustomizerNavigationAlignment
	        	const headerWrap = document.querySelector('.siteMainHeader__wrap')

	        	if(headerWrap) {

		        	if(navigationAlignment == 'left')
						headerElements = document.querySelectorAll('.siteMainHeader__wrap>*')
		        	
					else
						headerElements = document.querySelectorAll('.siteMainHeader__desktop-menu li')

					var totalWidth = 0

					for(var elem of headerElements)
						totalWidth += elem.offsetWidth
					

					if(totalWidth + 30 > headerWrap.clientWidth) {
						document.body.dataset.plotCustomizerNavigationForceBurger = "true"
					} else {
						document.body.dataset.plotCustomizerNavigationForceBurger = "false"
					}

				}

			}
        }

	}

	window.Main = Main

}());
 