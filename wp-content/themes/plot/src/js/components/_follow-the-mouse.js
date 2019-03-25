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

          FollowTheMouse.myX = (FollowTheMouse.startingX - event.beta/180)*8;
          FollowTheMouse.myY = (FollowTheMouse.startingX - event.gamma/90)*8;

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

            $('.mouseFollow').each(function(){
                
                var twistFactor = $(this).attr('data-twist-factor');
                $(this).css('transform','rotate3d(' + FollowTheMouse.myY + ', ' + FollowTheMouse.myX + ',0,'+twistFactor+'deg) translate3d(' + FollowTheMouse.myY*10*twistFactor + 'px, ' + FollowTheMouse.myX*10*twistFactor + 'px,' + twistFactor +'px)');

               
            });
             $('.debug').html('x: '+FollowTheMouse.myX+', y:'+FollowTheMouse.myY+'</div>');
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

