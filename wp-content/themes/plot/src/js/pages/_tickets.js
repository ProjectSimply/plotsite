(function () {

    'use strict';

    var $ = require('jquery'),
        Tickets;

    Tickets = {

        section: $('.JS--ticketRowSection'),
        sectionButton: $('.JS--ticketSectionSelector'),


        init: function () {

            var self = this;

            Tickets.createListeners();

            Tickets.makeTierScrollbox();

        },

        makeTierScrollbox: function () {

            var innerScroll = $('.ticketTiers .innerScroll');

            if (innerScroll.length > 0) {

                $('.ticketTiers__item').each(function (i) {

                    if ($(this).hasClass('ticketTiers__item--active')) {

                        var leftPosition = $(this).position().left;
                        var scrollBoxCenter = innerScroll.width() / 2;
                        var boxCenter = $(this).width() / 2;

                        innerScroll.scrollLeft(leftPosition - scrollBoxCenter + boxCenter);

                    }

                });

                innerScroll.removeClass('invisible');
            }

        },

        createListeners: function () {

            Tickets.sectionButton.on('click', function () {
                Tickets.toggleActiveSection($(this));
            });

        },


        toggleActiveSection: function (clickedButton) {

            // button state
            Tickets.sectionButton.removeClass('ticketSectionSelectors__item--active');
            clickedButton.addClass('ticketSectionSelectors__item--active');

            // section state
            Tickets.section.removeClass('ticketRowSection--active');
            $('.ticketRowSection[data-section="' + clickedButton.attr('data-section') + '"]').addClass('ticketRowSection--active');
        }


    }

    module.exports = Tickets;

}());
