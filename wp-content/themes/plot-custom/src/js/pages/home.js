(function () {

    var Home

    Home = {
        body: document.body,
        root: document.querySelector('html'),
        mobileScreen : document.querySelector('.mobile3D__phone'),    
        intervalLength: 5000,
        previousTheme: 'arts',
        counter: null,
        themes: [
            'sounds',
            'urban',
            'tagout',
            'box',
            'inter',
            'halftone',
            'deep',
            'arts'
            
        ],

        init: () => {

            Home.createListeners()

            Home.startThemeCounter()

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
            if(mutationsList[0].target.classList.contains('plotSmoothScrollInView') && Home.bannerInView == false) {

                Home.bannerInView = true

                Home.startThemeCounter()

            } 

            if(!mutationsList[0].target.classList.contains('plotSmoothScrollInView') && Home.bannerInView) {

                Home.bannerInView = false

                Home.stopThemeCounter()
                
                Home.removeTheme()
            }
        },

        startThemeCounter: () => {
            
            let i = 0
            Home.counter = setInterval(() => {        

                // Update mobile screen image
                Home.body.dataset.currentTheme = Home.themes[i]
                Home.body.dataset.previousTheme = Home.previousTheme

                // Update state
                Home.previousTheme = Home.themes[i]

                Home.body.classList.add('slideMobileScreen')

                setTimeout(() => {
                    Home.body.classList.remove('slideMobileScreen')    
                }, 500)

                // If we reach the end of the themes, reset to first theme
                i >= Home.themes.length - 1 ? i = 0 : i++

            }, Home.intervalLength);
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