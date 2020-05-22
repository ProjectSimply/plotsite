(function () {

    var BodyScrollLock   = require('body-scroll-lock'),
        LazyLoad         = require('./lazyload'),
        SyncScroll       = require('./syncscroll'), 
        Plot

    Plot = {

        init: () => {

            Plot.createListeners()
            SyncScroll.init() 
            Plot.animateBannerNotifications() 

        },

        createListeners: () => {

           	const burgerMenuTriggers = document.querySelectorAll('.JS--menuTrigger')
            
            if(burgerMenuTriggers.length > 0) {
                for(var burgerMenuTrigger of burgerMenuTriggers) {
                    burgerMenuTrigger.addEventListener('click',Plot.toggleBurger)
                }
            }

            const sideSwipes = document.querySelectorAll('.plotSideSwipes')

            if(sideSwipes.length > 0) {
                Plot.sideSwipes(sideSwipes)
            }

        },

        animateBannerNotifications : () => {
            const banner = document.querySelector('.JS--bannerNotification')

            if(banner)
                if(banner.dataset.animationType == 'always') {
                    Plot.buildBannerRepeatingText(banner)
                    window.addEventListener('resize', function() {
                        Plot.buildBannerRepeatingText(banner)
                    })
                } else {
                    Plot.checkToSeeIfWeNeedToAnimationBanner(banner)
                    window.addEventListener('resize', function() {
                        Plot.checkToSeeIfWeNeedToAnimationBanner(banner)
                    })
                }
        },

        checkToSeeIfWeNeedToAnimationBanner : banner => {

            banner.innerHTML = `<div>${banner.dataset.message}</div>`
            const div1 = banner.querySelector('div:nth-of-type(1)')
            const windowWidth = window.innerWidth
            
            if(div1.scrollWidth > windowWidth) {
                banner.classList.add('withAnimation')
                Plot.buildBannerRepeatingText(banner)
            } else {
                 banner.classList.remove('withAnimation')
            }

        },

        buildBannerRepeatingText : banner => {

            banner.innerHTML = `<div>${banner.dataset.message}</div><div>${banner.dataset.message}</div>`
            const div1 = banner.querySelector('div:nth-of-type(1)')
            const div2 = banner.querySelector('div:nth-of-type(2)')
            const windowWidth = window.innerWidth

            div1.style.animationDuration=(windowWidth/20)+"s"
            div2.style.animationDuration=(windowWidth/20)+"s"

            var i  = 0

            while(div1.scrollWidth < windowWidth && i < 100) {
                div1.innerHTML = div1.innerHTML + ` ${banner.dataset.message}`
                div2.innerHTML = div2.innerHTML + ` ${banner.dataset.message}`
                i++;
            }

        },

        sideSwipes : (sideSwipes) => {

            for(var sideSwipe of sideSwipes) {

                 if(parseInt(sideSwipe.getBoundingClientRect().width) + 1 < parseInt(sideSwipe.scrollWidth)) {


                 }

            }

        },

        toggleBurger : () => {

            const burgerMenu = document.querySelector('.JS--burgerMenu')

            if(!document.documentElement.classList.contains('burgerOpen')) {
                document.documentElement.classList.add('burgerOpen')
                BodyScrollLock.disableBodyScroll(burgerMenu)
            } else {
                document.documentElement.classList.remove('burgerOpen')
                BodyScrollLock.enableBodyScroll(burgerMenu)
            }

        },

        isPage : slug => {

            return document.body.classList.contains('page-'+slug)

        },

        fixVh : () => {

            // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
            let vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)


        },

        isTouchDevice: () => {

            var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
            var mq = function (query) {
                return window.matchMedia(query).matches
            }

            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            	document.body.addClass('isTouchDevice')  
                return true
            }

            var query = ['(', prefixes.join('touch-enabled),('), 'plot', ')'].join('')
            return mq(query)
        },

        areWeAtTheTop : scrollTop => {

            if(scrollTop > 0) {
                document.body.classList.add('scrolled')
            } else {
                document.body.classList.remove('scrolled')
            }
        },

        loadTemplatePart : (args) => { 
            
            var defaults = {
                templatePart    : null,
                action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
                data            : {},
                returnOrWrite   : 'write', //(write|return) either adds content to contentArea, or returns new HTML in the promise
                contentArea     : '.JS--ajaxTargetArea', 
                append          : false
            }

            let settings = Object.assign({}, defaults, args)
            

            try { 
                if(settings.returnOrWrite == 'write')
                    var contentArea = document.querySelector(settings.contentArea)
            }
            catch (e) {
                console.log('contentArea needs to be a valid selector!')
                return false
            }

            if(contentArea == null && settings.returnOrWrite == 'write') {
                console.log('Couldn\'t find selector for contentArea on page.')
                return false
            }

            if(settings.templatePart == null) {
                console.log('Couldn\'t find template part. Make sure you set one as templatePart, for example parts/ajax-content')
                return false
            }

            if(typeof(settings.append) !== "boolean") {
                console.log('Value passed to append was not a boolean.')
                return false
            }

            if(settings.returnOrWrite == 'write')
                contentArea.classList.add('plotLoading')

            settings.data = {
                data            : settings.data,
                action          : settings.action,
                templatePart    : settings.templatePart
            }

            var queryString = Plot.toQueryString(settings.data)
        
            return fetch(au, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: queryString,
                credentials: 'same-origin'

            }).then(data => {

                return data.json()

            }).then(result => {

                if(settings.returnOrWrite == 'write')
                    contentArea.classList.remove('plotLoading')
                
                if(result.success) {

                    if(settings.returnOrWrite !== 'write')
                        return result.html

                    if(settings.append) {
                        contentArea.insertAdjacentHTML('beforeend', result.html)
                    } else  {
                        contentArea.innerHTML = result.html
                    }

                    contentArea.querySelectorAll('.JS--lazyLoad').forEach(el => {
                        LazyLoad.observer.observe(el)
                    });

                    return result.html

                }

            }).catch(error =>{
                console.log('error',error)

            })



        },

        dateFormat : (date,format) => {

            if(format == 'dS M')
                return date.getDate() + Plot.getOrdinal(date.getDate()) + ' ' + Plot.getMonth(date)

            if(format == 'M dS')
                return Plot.getMonth(date) + ' ' + date.getDate() + Plot.getOrdinal(date.getDate()) 

            if(format == 'd/m/y')
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(-2)

            if(format == 'm/d/y')
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(-2)

            return Plot.getDayOfWeek(date)
         },

        getDayOfWeek : date => {

            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]

            return days[date.getDay()]

        },

        getOrdinal : number => {

              if (number > 3 && number < 21) return 'th';
              switch (number % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
              }

        },


        getMonth : date => {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            return monthNames[date.getMonth()]
        },

        toQueryString : (obj, prefix) => {
            var str = [], k, v;
            for(var p in obj) {
                if (!obj.hasOwnProperty(p)) {continue;} // skip things from the prototype
                if (~p.indexOf('[')) {
                    k = prefix ? prefix + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) : p;
                } else {
                    k = prefix ? prefix + "[" + p + "]" : p;
                }
                v = obj[p];
                str.push(typeof v == "object" ?
                  Plot.toQueryString(v, k) :
                  encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
            return str.join("&");
        }


    }

    module.exports = Plot

}())
