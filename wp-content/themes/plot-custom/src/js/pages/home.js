(function () {

    var Home

    Home = {
        body: document.body,
        intervalLength: 3500,
        themes: [
            'arts',
            'sounds',
            'urban',
            'purple'
        ],

        init: () => {

            Home.createListeners()

        },

        createListeners: () => {

            
            const homeBanner = document.querySelector('.homeBanner')

            // Observe the homebanner section for class changes
            const observer = new MutationObserver(Home.bannerInView)
            observer.observe(homeBanner, {
              attributes  : true,
            })

        },

        bannerInView: (mutationsList, observer) => {
            
            // If the banner element is in view
            if(mutationsList[0].target.classList.contains('plotSmoothScrollInView')) {
                Home.startThemeCounter()
            } else {

                Home.stopThemeCounter()
                
                Home.removeTheme()
            }
        },

        startThemeCounter: () => {
            // Change the class on the body element
            // remove previous class
            // If we reach the end of the theme, start at the begging again
            let i = 0
            Home.counter = setInterval(() => {

                if(Home.previousTheme)
                    Home.body.classList.remove(Home.previousTheme)

                document.body.classList.add(`homeBannerTheme--${Home.themes[i]}`)

                Home.previousTheme = `homeBannerTheme--${Home.themes[i]}`

                if(i >= Home.themes.length - 1) {
                    i = 0
                } else {
                    i++
                }

            }, 2000);
        },

        stopThemeCounter: () => {
            if(Home.counter)
                clearInterval(Home.counter)
        },

        removeTheme: () => {
            
            Home.body.classList.remove(Home.previousTheme)

            Home.previousTheme = ''
        }



    }

    module.exports = Home

}())