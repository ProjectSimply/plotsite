(function (){

    'use strict';

    var $           = require('jquery'),    
        FollowTheMouse;

    FollowTheMouse = {

        diffX : 0,
        diffY : 0,
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


            if (window.DeviceOrientationEvent) {
                console.log('dfg');
            }
            window.addEventListener('deviceorientation', FollowTheMouse.handleOrientation);


            $(window).resize(function () {

                FollowTheMouse.centreOfWindowX = $(window).width()/2;
                FollowTheMouse.centreOfWindowY = $(window).height()/2;

            });

            $(window).on('scroll', function () {

                FollowTheMouse.flagUpInViewElements($(window).scrollTop());            

            }); 

            FollowTheMouse.flagUpInViewElements($(window).scrollTop());            

        },



        handleOrientation : function(event) {
          var x = event.beta;  // In degree in the range [-180,180], x, 'front to back'
          var y = event.gamma; // In degree in the range [-90,90], y, 'left to right'
          
          if(FollowTheMouse.startingX === false) {
            FollowTheMouse.startingX = event.beta/180;
            FollowTheMouse.startingY = event.gamma/90;

          }

          FollowTheMouse.diffX = FollowTheMouse.startingX - event.beta/180;
          FollowTheMouse.diffY = FollowTheMouse.startingX - event.gamma/90;

          requestAnimationFrame(FollowTheMouse.update);

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

            $('.mouseFollow.inView').each(function(){
                
                var twistFactor = $(this).attr('data-twist-factor');
                $(this).css('transform','rotate3d(' + FollowTheMouse.diffY/FollowTheMouse.centreOfWindowY + ', ' + FollowTheMouse.diffX/FollowTheMouse.centreOfWindowX + ',0,'+twistFactor+'deg) translate3d(' + FollowTheMouse.diffY/FollowTheMouse.centreOfWindowY*10*twistFactor + 'px, ' + FollowTheMouse.diffX/FollowTheMouse.centreOfWindowX*10*twistFactor + 'px,' + twistFactor +'px)');


            });
        },

        mouseMoving : function(e) {

            FollowTheMouse.diffX = FollowTheMouse.centreOfWindowX - e.clientX;
            FollowTheMouse.diffY = FollowTheMouse.centreOfWindowY - e.clientY;

            if(FollowTheMouse.oldDiffY != FollowTheMouse.diffY || FollowTheMouse.oldDiffX != FollowTheMouse.diffX) {


                FollowTheMouse.oldDiffX = FollowTheMouse.diffX;
                FollowTheMouse.oldDiffY = FollowTheMouse.diffY;

                requestAnimationFrame(FollowTheMouse.update);

            }

        }
        
    }

    module.exports = FollowTheMouse;

}());

