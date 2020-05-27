(function () {

    var Home

    Home = {
        intervalLength: 3000,
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

            // Observe the homebanner section
            const homeBanner = document.querySelector('.homeBanner')

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
            }
                

            // If banner is out of view
                // Cancel interval
        },

        startThemeCounter: () => {
            // Change the class on the body element
            // remove previous class
            // If we reach the end of the theme, start at the begging again
            let i = 0
            Home.counter = setInterval(() => {

                if(Home.previousTheme)
                    document.body.classList.remove(Home.previousTheme)

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
        }

    }

    module.exports = Home

}())