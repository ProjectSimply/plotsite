(function () {

    var Plot 			= require('../../../../plot-core/src/js/plot'),
    	News

    //May this object act as a guide to using Plot core functions
    //and how to set up ajax dynamic data with our new principles with ease
    News = {

    	maxPages 			: 1,
        currentNewsCategory : 0,
        currentPage         : 1,
    	loadMoreButton  	: document.querySelector('.JS--newsLoadMore'),

        init: () => {

            if(News.loadMoreButton) {

            	News.showOrHideLoadMoreButton()

                News.createListeners()

            }

        },

        createListeners: () => {

        	News.loadMoreButton.addEventListener('click', e => {

        		const nextPage = parseInt(News.loadMoreButton.dataset.nextPage)

        		News.currentPage = nextPage

        		News.loadNews(true)

        		News.loadMoreButton.dataset.nextPage = nextPage + 1

        	})

        },

        loadNews : append => {

        	const args = {
				templatePart : 'parts/news-listing', 
				data : {
					'page' 			: News.currentPage,
					'artistType'	: News.currentNewsCategory
				},
				append : append 
			}

			return Plot.loadTemplatePart(args).then(html => {

				News.showOrHideLoadMoreButton()

                return true

			})

        },

        showOrHideLoadMoreButton : () => {

        	//Check if max pages is 1. If it is, there's only 1 page of News
        	//so we can hide load more button
        	News.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages

            console.log(News.maxPages)

        	if(News.maxPages > News.currentPage)
        		News.loadMoreButton.classList.remove('hidden')
        	else 
        		News.loadMoreButton.classList.add('hidden')

        }

    }

    module.exports = News

}())