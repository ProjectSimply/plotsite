(function () {

    'use strict';

    var $ = require('jquery'),        
        FAQs;

    FAQs = {

        faq : $('.faq'),


        init : function () {

            FAQs.createListeners();

        },


        createListeners : function(){

            $('.JS--faqCatButton').on('click', function(){
                FAQs.displayFaqs($(this));
            });
        },


        displayFaqs : function(clickedButton){

            var activeCat = clickedButton.attr('data-cat');

            $('.JS--faqCatButton').removeClass('faqCatButton--active');
            clickedButton.addClass('faqCatButton--active');

            FAQs.faq.addClass('hidden');

            $('.faq[data-cat = ' + activeCat + ']').removeClass('hidden');

        }

    }

    module.exports = FAQs;

}());
