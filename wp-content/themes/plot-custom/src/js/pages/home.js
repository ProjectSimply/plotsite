(function () {

    var Home

    Home = {
        dom : {
            body                    : document.body,
            root                    : document.querySelector('html'),
            phone                   : document.querySelector('.mobile3D')
        },
        intervalLength          : 5000,
        previousTheme           : 'arts',
        counter                 : null,
        currentMousePosition    : {
            X: window.innerWidth / 2,
            Y: window.innerHeight / 2
        },
        previousMousePosition   : {
            X: window.innerWidth / 2,
            Y: window.innerHeight / 2
        },
        mouseMoveAnimationFrame : null,
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

            Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

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


            Home.dom.body.addEventListener('mousemove', e => {

                Home.currentMousePosition = {
                    X: e.clientX,
                    Y: e.clientY
                }

                const middlePointX = window.innerWidth / 2
                const middlePointY = window.innerHeight / 2

                if(Home.currentMousePosition.X  - 2000 > middlePointX)
                    Home.currentMousePosition.X = middlePointX + 2000
                
                if(Home.currentMousePosition.X  + 2000 < middlePointX)
                    Home.currentMousePosition.X = middlePointX - 2000

                if(Home.currentMousePosition.Y  - 2000 > middlePointY)
                    Home.currentMousePosition.Y = middlePointY + 2000
                
                if(Home.currentMousePosition.Y  + 2000 < middlePointY)
                    Home.currentMousePosition.Y = middlePointY - 2000

                if(Home.ticker == false) {
                    Home.ticker = true
                    Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)
                }

            }) 
            
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
                Home.dom.body.dataset.currentTheme = Home.themes[i]
                Home.dom.body.dataset.previousTheme = Home.previousTheme

                // Update state
                Home.previousTheme = Home.themes[i]

                Home.dom.body.classList.add('slideMobileScreen')

                setTimeout(() => {
                    Home.dom.body.classList.remove('slideMobileScreen')    
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
                Home.dom.body.classList.remove(Home.previousTheme)

            Home.previousTheme = ''
            
        },

        toggleThemeCounter: () => {
            // Cancel animation if menu is open
            if(Home.dom.root.classList.contains('burgerOpen')) {

                Home.stopThemeCounter()
                Home.removeTheme()

            // Start animation if menu is closed and banner is in view    
            } else if(Home.bannerInView) {

                Home.startThemeCounter()
            }
        },

        runMouseMove : () => {


            const differenceOfPositions = {
                Y: Home.currentMousePosition.Y - Home.previousMousePosition.Y,
                X: Home.currentMousePosition.X - Home.previousMousePosition.X
            } 
            
            Home.previousMousePosition = {
                X: Home.previousMousePosition.X + (differenceOfPositions.X * 0.05),
                Y: Home.previousMousePosition.Y + (differenceOfPositions.Y * 0.05)
            }

            const xShift = (Home.previousMousePosition.X - (window.innerWidth / 2)) / (window.innerWidth / 2 )
            const yShift = ((window.innerHeight / 2) - Home.previousMousePosition.Y) / (window.innerHeight / 2 )
            
            Home.dom.phone.style.transform = `rotate3d(${.6*yShift +.4},${xShift},0,10deg) translate3d(${xShift*20}px,${yShift*20}px,0)`

            if(Math.abs(differenceOfPositions.X + differenceOfPositions.Y) < .1)
                Home.ticker = false

            if(Home.ticker == true) 
                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

        },


    }

    module.exports = Home

}())