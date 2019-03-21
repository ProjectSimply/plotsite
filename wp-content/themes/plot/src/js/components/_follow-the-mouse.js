(function (){

    'use strict';

    var $           = require('jquery'),    
        FollowTheMouse;

    FollowTheMouse = {

        init: function() {  

            $('.mouseFollow').each(function(){

                $(this).wrap('<div class="perspectiveWrap" />');

            });

            $('.siteWrap').mousemove(function(e){

                FollowTheMouse.follow(this,e);

            }); 
          
        },

        follow : function(elem,event) {



            $('.mouseFollow',elem).each(function(){


                var x = event.clientX;
                var y = event.clientY;
                var centreOfWindowX = $(window).width()/2;
                var centreOfWindowY = $(window).height()/2;
                var diffX = centreOfWindowX -x;
                var diffY = centreOfWindowY - y;
                var twistFactor = parseInt($(this).attr('data-twist-factor'));
                $(this).css('transform','rotate3d(' + diffY/centreOfWindowY + ', ' + diffX/centreOfWindowX + ',0,'+twistFactor+'deg) translate3d(' + diffY/centreOfWindowY*10*twistFactor + 'px, ' + diffX/centreOfWindowX*10*twistFactor + 'px,' + twistFactor +'px)');


            });
        }
        
    }

    module.exports = FollowTheMouse;

}());

