(function () {

    var Home

    Home = {
        body: document.body,
        root: document.querySelector('html'),        
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
            const observer = new MutationObserver(Home.bannerMutation)
            observer.observe(homeBanner, {
              attributes  : true,
            })

            // Observe the root to see if burger menu is open
            Home.watchRoot()
            
        },

        bannerMutation: (mutationsList, observer) => {
            
            // If the banner element is in view
            if(mutationsList[0].target.classList.contains('plotSmoothScrollInView')) {

                Home.bannerInView = true

                Home.startThemeCounter()

            } else {

                Home.bannerInView = false

                Home.stopThemeCounter()
                
                Home.removeTheme()
            }
        },

        startThemeCounter: () => {
            
            let i = 0
            Home.counter = setInterval(() => {

                // Remove previous class
                if(Home.previousTheme)
                    Home.body.classList.remove(Home.previousTheme)

                // Change the class on the body element
                document.body.classList.add(`homeBannerTheme--${Home.themes[i]}`)

                // Update state
                Home.previousTheme = `homeBannerTheme--${Home.themes[i]}`

                // If we reach the end of the themes, reset to first theme
                i >= Home.themes.length - 1 ? i = 0 : i++

            }, 2000);
        },

        stopThemeCounter: () => {

            if(Home.counter)
                clearInterval(Home.counter)

        },

        removeTheme: () => {
            
            if(Home.previousTheme)
                Home.body.classList.remove(Home.previousTheme)

            Home.previousTheme = ''
            
        },

        watchRoot: () => {
            // Observe the homebanner section for class changes
            const observer = new MutationObserver(Home.rootMutation)
            observer.observe(Home.root, {
                attributes  : true,
            })
        },

        rootMutation: (mutationsList, observer) => {
            // Check if burger menu is open
            console.log(mutationsList[0]) 
            if(mutationsList[0].target.classList.contains('burgerOpen')) {
            
                Home.burgerMenuOpen = true
                
                Home.stopThemeCounter()
                Home.removeTheme()
    
            }  else if(Home.burgerMenuOpen && Home.bannerInView) {
                // Fire if burgerMenu is closed and banner is in view
                Home.startThemeCounter()
            }



        }



    }

    module.exports = Home

}())