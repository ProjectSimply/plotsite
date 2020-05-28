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

            
            const burgerMenuTriggers = document.querySelector('.JS--menuTrigger')

            // Toggle banner animation when menu opened/closed
            burgerMenuTriggers.addEventListener('click', Home.toggleThemeCounter)
            
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

        toggleThemeCounter: () => {
            // Cancel animation if menu is open
            if(Home.root.classList.contains('burgerOpen')) {

                Home.stopThemeCounter()
                Home.removeTheme()

            // Start animation if menu is closed and banner is in view    
            } else if(Home.bannerInView) {

                Home.startThemeCounter()
            }
        },



    }

    module.exports = Home

}())