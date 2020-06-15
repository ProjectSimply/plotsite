(function () {

    var Home

    Home = {
        dom : {
            body                    : document.body,
            root                    : document.querySelector('html'),
            phone                   : document.querySelector('.mobile3D__phone'),
            homeBanner              : document.querySelector('.homeBanner'),
            header                  : document.querySelector('#siteMainHeader'),
            colourShapes        : {
                1 : document.querySelector('.colourShape--1'),
                2 : document.querySelector('.colourShape--2'),
                3 : document.querySelector('.colourShape--3'),
                4 : document.querySelector('.colourShape--4'),
                5 : document.querySelector('.colourShape--5'),
                6 : document.querySelector('.colourShape--6'),
            }
        },
        intervalLength          : 5000,
        previousTheme           : 'deep',
        counter                 : null,
        ticker                  : false,
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


            

            if(window.innerWidth < 640) {

                Home.dom.body.classList.add('smallScreen');
                
            } else {

                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

                Home.dom.homeBanner.addEventListener('mousemove', (e) => Home.trackCursorPosition(e)) 
            }
                
            
            
        },

        bannerMutation: (mutationsList, observer) => {
            
            // If the banner element is in view
            if(mutationsList[0].target.classList.contains('plotSmoothScrollInView') && !Home.bannerInView) {
                            
                Home.bannerInView = true

                Home.startThemeCounter()

            } 

            if(!mutationsList[0].target.classList.contains('plotSmoothScrollInView') && Home.bannerInView) {

                Home.bannerInView = false

                Home.stopThemeCounter()
                
                Home.removeTheme()
            }
        },

        trackCursorPosition: (e) => {
    
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

            
        },

        startThemeCounter: () => {
            
            Home.bannerInView = true;

            // Set header to default style
            if(Home.dom.header.classList.contains('defaultHeader'))
                Home.dom.header.classList.remove('defaultHeader') 
        
            
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

            // Set header to default style
            Home.dom.header.classList.add('defaultHeader') 
            
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
                X: Home.previousMousePosition.X + (differenceOfPositions.X * 0.1),
                Y: Home.previousMousePosition.Y + (differenceOfPositions.Y * 0.1)
            }

            const xShift = (Home.previousMousePosition.X - (window.innerWidth / 2)) / (window.innerWidth / 2 )
            const yShift = ((window.innerHeight / 2) - Home.previousMousePosition.Y) / (window.innerHeight / 2 )
            
            Home.dom.phone.style.transform = `rotateX(${10 + yShift*10}deg) rotateY(${xShift*60 > 50 ? 50 : xShift*60}deg)`

            const multiplier = 10
            Home.dom.colourShapes[1].style.transform = `translateX(${xShift * multiplier * 5}px) translateY(${-5*yShift*multiplier}px) translateZ(5rem)` 
            Home.dom.colourShapes[2].style.transform = `translateX(${xShift * multiplier * 3}px) translateY(${-3*yShift*multiplier}px) translateZ(5rem)` 
            Home.dom.colourShapes[3].style.transform = `translateX(${xShift * multiplier * 9}px) translateY(${-9*yShift*multiplier}px) translateZ(5rem)` 
            Home.dom.colourShapes[4].style.transform = `translateX(${xShift * multiplier * 2}px) translateY(${-2*yShift*multiplier}px) translateZ(5rem)` 
            Home.dom.colourShapes[5].style.transform = `translateX(${xShift * multiplier * 4}px) translateY(${-4*yShift*multiplier}px) translateZ(5rem)` 
            Home.dom.colourShapes[6].style.transform = `translateX(${xShift * multiplier * 7}px) translateY(${-7*yShift*multiplier}px) translateZ(5rem)` 

            if(Math.abs(differenceOfPositions.X + differenceOfPositions.Y) < .1)
                Home.ticker = false

            if(Home.ticker == true) 
                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

        },


    }

    module.exports = Home

}())