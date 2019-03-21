(function () {

    'use strict';

    var $ = require('jquery'),
        perfectScrollbar = require('perfect-scrollbar'),
        Modals;

    Modals = {

        isMagicModalOpen: false,
        scrollLocked: false,
        scrollTop: 0,
        galleryClass: '.psImageGallery',


        init: function () {

            Modals.createListeners();
        },


        createListeners: function () {

            $(Modals.galleryClass + ' a').on('click', function (e) {
                e.preventDefault();
                Modals.openGalleryItem($(this).attr('href'));
            });

            if ($(Modals.galleryClass).length > 0) {
                $('html').addClass('psGallery');
            }

            $('body').on('click', '.JS--closeMagicModal', function () {
                Modals.closeMagicModal();
            });

            $('.JS--triggerArtistModal').on('click',function() {

                Modals.openArtistModal($(this).attr('data-artistid'));
            });

            $('.JS--magicModalNotification').each(function(){

                Modals.fireNotificationPopUp($(this));

            });

        },


        fireNotificationPopUp : function(elem) {

            var time = parseInt(elem.attr('data-time'));

            setTimeout(function(){

                Modals.openMagicModal(elem); 

            },time*1000);

        },

        openArtistModal : function(artistId) {

            

            $('body').addClass('overlayInView');

            $.ajax({
                url: au,
                method: 'post',
                dataType: 'JSON',
                data: {
                    action: 'artistModal', 
                    'artistId' : artistId             
                },
                success: function (data) {
                    
                    if (data) {    
                        console.log(data);
                        $('.JS--magicModalArtist h3').html(data.title);
                        $('.JS--magicModalArtist .subInfo').html(data.stage + ' ' + data.time);
                        $('.JS--magicModalArtist .modalContent').html(data.biog);                         
                        Modals.openMagicModal($('.JS--magicModal'));
                        Sitewide.checkScrollItems();
                    }
                }
            });

        },


        closeMagicModal: function () {

            if (!$('.magicModal').hasClass('hidden')) {

                $('body').removeClass('modalInView overlayInView');
                $('.magicModal').addClass('hidden');

                Modals.fixedScroll();

                Modals.scrollLocked = false;
                Modals.isMagicModalOpen = false;
            }
        },


        openGalleryItem: function (link) {

            $('.psGalleryModal').remove();


            $('body').addClass('overlayInView');


            var magicModal = '<div class="psGalleryModal magicModal hidden">';
            magicModal += '<div class="magicModalInner psGalleryModal__inner">';
            magicModal += '<button class="JS--closeMagicModal psGalleryModal__close" > Close</button >';
            magicModal += '<img src="' + link + '">';
            magicModal += '</div></div>';

            $('body').append(magicModal);

            var img = new Image();

            img.onload = function () {

                var width = this.width;
                var height = this.height;
                var ratio = width / height;
                var maxHeight = $(window).height() * 0.8;
                var maxWidth = maxHeight * ratio;

                $('.psGalleryModal img').css('max-height', $(window).height() * 0.8);

                $('.psGalleryModal__inner').css('max-width', maxWidth);
            };

            img.src = link;

            Modals.openMagicModal('.psGalleryModal');
        },

        openMagicModal: function (selector) {

            var self = this;

            $('body').addClass('modalInView');

            Modals.fixedScroll();

            $(selector).removeClass('hidden');
            Modals.isMagicModalOpen = true;

            self.checkModalForScrollbarNeeds(selector);
        },


        checkModalForScrollbarNeeds: function (selector) {

            var modalElement = $('.magicModalInner', selector)[0],
                modalHeight = modalElement.scrollHeight;

            if (modalHeight > $(window).height() - 28) {

                if ($('.magicModalInner', selector).hasClass('withScrollbar') == false) {
                    perfectScrollbar.destroy(modalElement);
                    $('.magicModalInner', selector).addClass('withScrollbar');
                    perfectScrollbar.initialize(modalElement, { suppressScrollX: true });
                }

            } else {
                perfectScrollbar.destroy(modalElement);
            }

        },


        fixedScroll: function () {

            if (Modals.scrollLocked == false) {

                Modals.scrollTop = $(window).scrollTop();
                $('body').addClass('scrollLocked');
                $('body').css('top', -Modals.scrollTop);
                Modals.scrollLocked = true;

            } else {

                $('body').css('top', 0);
                $('body').removeClass('scrollLocked');
                $(window).scrollTop(Modals.scrollTop);
            }
        }
    }

    module.exports = Modals;

}());
