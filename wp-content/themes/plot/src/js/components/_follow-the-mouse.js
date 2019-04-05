(function (){

    'use strict';

    var $           = require('jquery'),    
        FollowTheMouse;

    FollowTheMouse = {

        diffX : 0,
        diffY : 0,
        myX : 0,
        myY : 0,
        oldDiffX : 0,
        oldDiffY : 0,
        centreOfWindowX : $(window).width()/2,
        centreOfWindowY : $(window).height()/2,
        startingX : false,
        startingY : false,
        startingZ : false,
        init: function() {  


            
            $('.mouseFollow').each(function(){

                $(this).wrap('<div class="perspectiveWrap" />');

            });

            FollowTheMouse.createListeners();

            requestAnimationFrame(FollowTheMouse.update);

          
        },

        createListeners : function() {

            $('.siteWrap').mousemove(function(e){

                FollowTheMouse.mouseMoving(e);

            });



            $(window).resize(function () {

                FollowTheMouse.centreOfWindowX = $(window).width()/2;
                FollowTheMouse.centreOfWindowY = $(window).height()/2;

            });

            $(window).on('scroll', function () {

                FollowTheMouse.flagUpInViewElements($(window).scrollTop());            

            }); 

            FollowTheMouse.flagUpInViewElements($(window).scrollTop());            

        },

        flagUpInViewElements: function (scroll) {

            var bottomOfWindow = scroll + $(window).height();

            $('.mouseFollow').each(function () {

                if ($(this).offset().top < bottomOfWindow && $(this).offset().top + $(this).height() > scroll - 400) {
                    $(this).addClass('inView');
                }
                else {
                     $(this).removeClass('inView');
                }

            });

        },

        update : function() {

            $('.mouseFollow').each(function(){
                
                var twistFactor = $(this).attr('data-twist-factor');
                $(this).css('transform','rotate3d(' + FollowTheMouse.myY + ', ' + FollowTheMouse.myX + ',0,'+twistFactor+'deg) translate3d(' + FollowTheMouse.myY*10*twistFactor + 'px, ' + FollowTheMouse.myX*10*twistFactor + 'px,' + twistFactor +'px)');

               
            });
        },

        mouseMoving : function(e) {

            FollowTheMouse.diffX = FollowTheMouse.centreOfWindowX - e.clientX;
            FollowTheMouse.diffY = FollowTheMouse.centreOfWindowY - e.clientY;

            if(FollowTheMouse.oldDiffY != FollowTheMouse.diffY || FollowTheMouse.oldDiffX != FollowTheMouse.diffX) {


                FollowTheMouse.oldDiffX = FollowTheMouse.diffX;
                FollowTheMouse.oldDiffY = FollowTheMouse.diffY;

                FollowTheMouse.myY = FollowTheMouse.diffY/FollowTheMouse.centreOfWindowY;
                FollowTheMouse.myX = FollowTheMouse.diffX/FollowTheMouse.centreOfWindowX;

                requestAnimationFrame(FollowTheMouse.update);

            }

        }
        
    }

    module.exports = FollowTheMouse;

}());

