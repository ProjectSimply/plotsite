(function () {

    var Plot 			= require('../../../../plot-core/src/js/plot'),
        Modals          = require('../../../../plot-core/src/js/modals'),
    	Artists

    //May this object act as a guide to using Plot core functions
    //and how to set up ajax dynamic data with our new principles with ease
    Artists = {

    	maxPages 			: 1,
        filterData            : {
            'pge'           : 1,
            'artistType'    : false,
            'artistDay'     : false
        },
    	
    	loadMoreButton  	          : document.querySelector('.JS--artistsLoadMore'),
        dropdownItemForArtistTypes    : document.querySelectorAll('.artistTypes .plotPossibleDropdown__item'),
        artistFilterDropdownSelector  : document.querySelector('.artistTypes .plotPossibleDropdown__selector'),
        dropdownItemForArtistDays     : document.querySelectorAll('.artistDays .plotPossibleDropdown__item'),
        dayFilterDropdownSelector     : document.querySelector('.artistDays .plotPossibleDropdown__selector'),

        init: () => {

        	Artists.showOrHideLoadMoreButton()

            Artists.createListeners()

            Artists.checkForURLParamsAndPopulateFilters()

        },

        checkForURLParamsAndPopulateFilters : () => {

            //Do we have any URL Params
            const urlParams = new URLSearchParams(window.location.search)

            //gather them
            Artists.filterData.artistType = urlParams.get('artist-type')
            Artists.filterData.artistDay = urlParams.get('artist-day')

            if(Artists.filterData.artistType)
                var elementWithArtistType = document.querySelector('[data-artist-type-id="' + Artists.filterData.artistType + '"]')
            else 
                var elementWithArtistType = document.querySelector('[data-artist-type-id="all"]')

            if(elementWithArtistType) 
                Artists.processDropdowns(elementWithArtistType,'artist')
            


            if(Artists.filterData.artistDay) 
                var elementWithDay = document.querySelector('[data-artist-date="' + Artists.filterData.artistDay + '"]')
            else 
                var elementWithDay = document.querySelector('[data-artist-date="all"]')

            if(elementWithDay) 
                Artists.processDropdowns(elementWithDay,'date')
        

        },

        checkFiltersOnPopstate : (e) => {

            Artists.filterData.pge = 1
            Artists.filterData.artistType = false
            Artists.filterData.artistDay = false
        

            if(e.state) {
                Artists.filterData.pge = e.state.pge ? e.state.pge : 1
                Artists.filterData.artistType = e.state.artistType ? e.state.artistType : false
                Artists.filterData.artistDay = e.state.artistDay ? e.state.artistDay : false
            }

            Artists.loadArtists(false).then(() => {

                const artistsMain = document.querySelector('.artistsMain')

                if(artistsMain)  {
                    artistsMain.scrollIntoView({
                        behavior: 'smooth' 
                    })
                }
                
            })

            Artists.checkForURLParamsAndPopulateFilters()

        },

        createListeners: () => {

            if(Artists.loadMoreButton)
            	Artists.loadMoreButton.addEventListener('click', e => {

            		const nextPage = parseInt(Artists.loadMoreButton.dataset.nextPage)

                    Artists.loadMoreButton.classList.add('loading')

            		Artists.filterData.pge = nextPage

                    var newQueryString = Artists.buildQueryString()
                    history.pushState(Artists.filterData, document.title, newQueryString)

            		Artists.loadArtists(true)

            		Artists.loadMoreButton.dataset.nextPage = nextPage + 1

            	})

            window.addEventListener('popstate',e => {
                Artists.checkFiltersOnPopstate(e)
            })

        	document.addEventListener('click', e => {

                //Have we clicked on an artist type filter button?
				if (e.target.closest('.JS--artistTypeButton')) {
					Artists.loadArtistType(e.target)
                    e.preventDefault()
				}

                //Have we clicked on an artist day filter button?
                if (e.target.closest('.JS--artistDayButton')) {
                    Artists.filterData.artistDay = e.target.dataset.artistDate
                    Artists.filterData.pge = 1
                    Artists.loadMoreButton.dataset.nextPage = 2
                    document.querySelectorAll('.JS--artistDayButton').forEach(artistDayButton => {

                        artistDayButton.classList.remove('selected')

                    })

                    e.target.classList.add('selected')

                    var newQueryString = Artists.buildQueryString()

                    history.pushState(Artists.filterData, document.title, newQueryString)

                    Artists.loadArtists(false).then(() => {

                        const artistsMain = document.querySelector('.artistsMain')

                        if(artistsMain)  {
                            artistsMain.scrollIntoView({
                                behavior: 'smooth' 
                            })
                        }
                        
                    })
                } 

                if(e.target.closest('.artistFiltersButton')) {

                    const filters = document.querySelector('.artistFilters')

                    if(filters)
                        if(filters.classList.contains('artistFilters--open')) 
                            filters.classList.remove('artistFilters--open')
                        else 
                            filters.classList.add('artistFilters--open')
                }

			}, false)


        },

        processDropdowns : (target,type) => {

            let items    = Artists.dropdownItemForArtistDays
            let selector = Artists.dayFilterDropdownSelector
            let dataType = 'artistDate'
            let currentFilter = Artists.filterData.artistDay

            if(type == 'artist') {
                items    = Artists.dropdownItemForArtistTypes
                selector = Artists.artistFilterDropdownSelector
                dataType = 'artistTypeId'
                currentFilter = Artists.filterData.artistType
            } 

            if(items)
                for (var item of items) {
                    item.classList.remove('hidden')
                    if(item.dataset[dataType] == currentFilter) {
                        item.classList.add('hidden')
                    }
                }
            if(selector)
               selector.innerHTML = target.innerHTML

        },

        loadArtistType : (target) => {

            Artists.filterData.artistType = target.dataset.artistTypeId
            Artists.filterData.pge = 1
            Artists.loadMoreButton.dataset.nextPage = 2
            document.querySelectorAll('.JS--artistTypeButton').forEach(artistTypeButton => {

                artistTypeButton.classList.remove('selected')

            })

            const buttonsToBeSelected = document.querySelectorAll('[data-artist-type-id="' + Artists.filterData.artistType + '"]')

            for(var button of buttonsToBeSelected) 
                button.classList.add('selected')

            Artists.processDropdowns(target,'artist')

            var newQueryString = Artists.buildQueryString()
            history.pushState(Artists.filterData, document.title, newQueryString)

            Artists.loadArtists(false).then(() => {

                const artistsMain = document.querySelector('.artistsMain')

                if(artistsMain)  {
                    artistsMain.scrollIntoView({
                        behavior: 'smooth' 
                    })
                }
                
            })

        },

        buildQueryString : () => {

            var queryString = "?"

            if(Artists.filterData.pge != 1)
                queryString += 'pge=' + Artists.filterData.pge + '&'
            if(Artists.filterData.artistType != false && Artists.filterData.artistType != null)
                queryString += 'artist-type=' + Artists.filterData.artistType + '&'
            if(Artists.filterData.artistDay != false && Artists.filterData.artistDay != null)
                queryString += 'artist-day=' + Artists.filterData.artistDay + '&'

            return queryString.substring(0, queryString.length - 1);

        },

        loadArtists : append => {

        	const args = {
				templatePart : 'parts/artist-listing', 
				data : Artists.filterData,
				append : append 
			}

			return Plot.loadTemplatePart(args).then(html => {

				Artists.showOrHideLoadMoreButton()

                Artists.loadMoreButton.classList.remove('loading')

                return true

			})

        },

        showOrHideLoadMoreButton : () => {

        	//Check if max pages is 1. If it is, there's only 1 page of artists
        	//so we can hide load more button
            var maxPageElem = document.querySelector('.JS--maxPages')

            if(maxPageElem) {
            	Artists.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages

            	if(Artists.maxPages > Artists.filterData.pge)
            		Artists.loadMoreButton.classList.remove('hidden')
            	else 
            		Artists.loadMoreButton.classList.add('hidden')
            }

        }

    }

    module.exports = Artists

}())