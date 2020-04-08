// Modals for Plot by Michael Watson
// A simple modals solution that looks for the class "JS--plotModalButton"
// And when clicked, reads the value set on data-plot-modal. it then looks
// for an HTML element called ".JS--plotModalContents" with a corresponding value.

// For example, <a class="JS--plotModalButton" data-plot-modal="1">Click me</a>
// Will find the following element:
// <div class="JS--plotModalContents">I am some modal content!</div>
// And will take the innerHTML to put inside a modal on the screen.

// Galleries can be created by connecting multiple Plot Modal Buttons
// by giving them a data-plot-modal-group option.
// They will then have working left and right arrows to navigate through
// Contents in a loop.

(function () {

    var LazyLoad         = require('./lazyload'),  
        Plot             = require('./plot'),
        BodyScrollLock   = require('body-scroll-lock'),
        Modals

    Modals = {
        currentGroupItem    : 0,
        groupLinks          : [],  
        currentModalId      : null,
        isOpen              : false,
        isLoading           : false,
        controlsTimer       : false,
        modalContent        : document.querySelector('.JS--plotModalReplaceContents'),
        modalScrollViewport : document.querySelector('.JS--plotModalScrollViewport'),
        modalGroupControls  : document.querySelector('.JS--plotModalControls'),
        modalGroupNext      : document.querySelector('.JS--plotModalControls__next'),
        modalGroupBack      : document.querySelector('.JS--plotModalControls__back'),
        plotModal           : document.querySelector('.JS--plotModal'),


        init: function () {

            Modals.createListeners()
            Modals.checkForModalNotification()
        },

        createListeners: function () {

            const closeButtons = document.querySelectorAll('.JS--closePlotModal')

            for(var closeButton of closeButtons) {
                closeButton.addEventListener('click',Modals.closePlotModal)
            }

            Modals.plotModal.addEventListener('mousemove',function(){

                if(Modals.currentModalId && !Plot.isTouchDevice()) {

                    if(Modals.controlsTimer)
                        clearTimeout(Modals.controlsTimer)
        
                    if(Modals.plotModal.classList.contains('hideControls'))
                        Modals.plotModal.classList.remove('hideControls')

                    Modals.controlsTimer = setTimeout(function() {

                        Modals.plotModal.classList.add('hideControls')

                    },2200)

                }

            })
                
            document.addEventListener('click', function(e){

                if(e.target.closest('[data-plot-modal]')) {
                    e.preventDefault()
                    Modals.openPlotModal(e.target.closest('[data-plot-modal]'))
                }

            })

            if(Modals.modalGroupBack) {

                Modals.modalGroupBack.addEventListener('click',Modals.triggerBackGroupItem);

            }

            if(Modals.modalGroupNext) {

                Modals.modalGroupNext.addEventListener('click',Modals.triggerNextGroupItem);

            }

            document.addEventListener('keydown', (e) => {

                if(e.which == 39 && Modals.groupLinks.length > 0) {

                    Modals.triggerNextGroupItem()
                }

                if(e.which == 37 && Modals.groupLinks.length > 0) {

                    Modals.triggerBackGroupItem()

                }
                
                if(Modals.isOpen && e.which==27) {

                    Modals.closePlotModal()
                
                }

            });

        },


        checkForModalNotification : () => {

            const notificationTrigger = document.querySelector('.JS--fakeButtonForModalNotifications')

            if(notificationTrigger) {

                if (sessionStorage.getItem('plotHasNotificationFired') !== "1") { 

                    sessionStorage.setItem('plotHasNotificationFired', '1');

                    setTimeout(function() {

                        Modals.openPlotModal(notificationTrigger)

                    },notificationTrigger.dataset.plotNotificationWait*1000)

                }

            }

        },

        triggerBackGroupItem : () => {

            Modals.currentGroupItem--

            if(Modals.currentGroupItem < 0) {

                Modals.currentGroupItem = Modals.groupLinks.length - 1;

            }

            Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem])

        },

        triggerNextGroupItem : () => {

            Modals.currentGroupItem++

            if(Modals.currentGroupItem == Modals.groupLinks.length) {

                Modals.currentGroupItem = 0

            }

            Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem])

        },

        openPlotModal: (element) => {

            if(Modals.isLoading == true)
                return false

            var settings = {
                type            : 'inline', // (inline|ajax) if the content is already in the dom or not
                groupId         : '', //The optional ID of the group of modals used for gallery views
                contentsId      : '', //The ID that references where, on the page, the content to use lives
                templatePart    : '', //The template part to load, if AJAX
                ajaxData        : {}, //Data to send via AJAX
                modalClass      : '' //A custom class to add to our modal
            }

            Modals.isLoading = true

            if(element.dataset.plotModalType == 'ajax') {
                settings.type = 'ajax'
            }

            settings.contentsId     = element.dataset.plotModalContents
            settings.groupId        = element.dataset.plotModalGroup
            settings.templatePart   = element.dataset.plotModalTemplatePart
            settings.modalClass     = element.dataset.plotModalClass

            if(!settings.contentsId && settings.type == 'inline') {
                console.log('Inline Modals need a plot-modal-contents variable added')
                return false
            }

            if(settings.type == 'ajax' && !settings.templatePart) {
                console.log('Ajax modals need a plot-modal-template-part variable added')
                return false
            }

            //Check to see if it's part of a group
            
            if(Modals.groupLinks.length == 0 && settings.groupId)
               Modals.initialiseGroup(element)
            
            if(!settings.groupId)
                Modals.modalGroupControls.classList.add('hidden')

            if(settings.modalClass) {
                Modals.plotModal.classList.add(settings.modalClass)
            }

            if(settings.type == 'inline') {

                Modals.currentModalId = settings.contentsId

                //Find content to insert in our modal
                var plotModalContents = document.querySelector('.JS--plotModalContents[data-plot-modal-contents="' + Modals.currentModalId + '"]')

                if(!plotModalContents.length == 0)
                    return false

                plotModalContents = plotModalContents.innerHTML;

                Modals.putContentsIntoModal(plotModalContents)

            } else {
                //AJAX loading content
                var ajaxData = {}

                document.body.classList.add('plotModalLoadingAjax')

                for(const key in element.dataset) {
                    if(key.substring(0,13) == 'plotModalData') {
                        ajaxData[key.charAt(13).toLowerCase() + key.substring(14)] = element.dataset[key]
                    }
                }
                 
                const args = {
                    returnOrWrite   : 'return',
                    templatePart    : settings.templatePart,
                    data            : ajaxData
                }
                Plot.loadTemplatePart(args).then(html => {
                    Modals.putContentsIntoModal(html)
                })
            }

        },

        putContentsIntoModal : contents =>  {


            Modals.modalContent.style.minHeight = Modals.modalContent.clientHeight + 'px'
            Modals.modalContent.innerHTML = contents

            BodyScrollLock.disableBodyScroll(Modals.modalScrollViewport)

            document.body.classList.add('plotModalInView')

            const newImages = Modals.modalContent.querySelectorAll('img')

            LazyLoad.addElements(newImages).then(() => {

                setTimeout(()=> {

                    Modals.modalContent.style.minHeight = 0

                },50)

            })

            const newVideos = Modals.modalContent.querySelectorAll('video')



            newVideos.forEach(video =>{

                var player = new MediaElementPlayer(video,/* Options */);
                player.play();

            })

            Modals.isOpen = true
            Modals.isLoading = false
            document.body.classList.remove('plotModalLoadingAjax')

        },

        initialiseGroup : (element) => {

            Modals.groupLinks = document.querySelectorAll('[data-plot-modal-group="'+element.dataset.plotModalGroup+'"]')

            var i = 0

            for(var groupLink of Modals.groupLinks) {

                if(element == groupLink)
                    Modals.currentGroupItem = i;
                
                i++

            }

            if(Modals.currentModalId && !Plot.isTouchDevice())

                Modals.controlsTimer = setTimeout(function() {

                    Modals.plotModal.classList.add('hideControls')

                },3000)

            Modals.modalGroupControls.classList.remove('hidden')

        },

        closePlotModal: () => {
    
            document.body.classList.remove('plotModalInView')

            Modals.currentModalId = null

            Modals.plotModal.classList = 'JS--plotModal plotModal'

            Modals.groupLinks = []

            Modals.currentGroupItem = 0

            Modals.modalContent.innerHTML = ''
            
            BodyScrollLock.enableBodyScroll(Modals.modalScrollViewport)

            Modals.isOpen = false
        }

    }

    module.exports = Modals

}())
