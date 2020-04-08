(function () {

    var Plot 			= require('../../../../plot-core/src/js/plot'),
        Modals          = require('../../../../plot-core/src/js/modals'),
    	Artists

    //May this object act as a guide to using Plot core functions
    //and how to set up ajax dynamic data with our new principles with ease
    Artists = {

    	maxPages 			: 1,
    	currentPage 		: 1,
    	currentArtistType	: false,
    	loadMoreButton  	: document.querySelector('.JS--artistsLoadMore'),

        init: () => {

        	Artists.showOrHideLoadMoreButton()

            Artists.createListeners()

        },

        createListeners: () => {

        	Artists.loadMoreButton.addEventListener('click', e => {

        		const nextPage = parseInt(Artists.loadMoreButton.dataset.nextPage)

        		Artists.currentPage = nextPage

        		Artists.loadArtists(true)

        		Artists.loadMoreButton.dataset.nextPage = nextPage + 1

        	})

        	document.addEventListener('click', e => {

                //Have we clicked on an artist type filter button?
				if (e.target.closest('.JS--artistTypeButton')) {
					Artists.currentArtistType = e.target.dataset.artistTypeId
					Artists.currentPage = 1
                    Artists.loadMoreButton.dataset.nextPage = 2
					Artists.loadArtists(false).then(() => {

                        document.querySelectorAll('.JS--artistTypeButton').forEach(artistTypeButton => {

                            artistTypeButton.classList.remove('selected')

                        })

                        e.target.classList.add('selected')
                        
                    })
				} 

			}, false)


        },

        loadArtists : append => {

        	const args = {
				templatePart : 'parts/artist-listing', 
				data : {
					'page' 			: Artists.currentPage,
					'artistType'	: Artists.currentArtistType
				},
				append : append 
			}

			return Plot.loadTemplatePart(args).then(html => {

				Artists.showOrHideLoadMoreButton()

                return true

			})

        },

        showOrHideLoadMoreButton : () => {

        	//Check if max pages is 1. If it is, there's only 1 page of artists
        	//so we can hide load more button
        	Artists.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages

        	if(Artists.maxPages > Artists.currentPage)
        		Artists.loadMoreButton.classList.remove('hidden')
        	else 
        		Artists.loadMoreButton.classList.add('hidden')

        }

    }

    module.exports = Artists

}())