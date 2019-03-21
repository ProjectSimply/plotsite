(function (){

    'use strict';

	var $ 	        = require('jquery'),	
	    WeirdOnHover;

	WeirdOnHover = {

		init: function() {	 

            $('.weirdOnHover').each(function(){

                var elem = this;

                elem.innerHTML = elem.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word"><span>$2</span></span>');


            });         
            
        }
        
	}

	module.exports = WeirdOnHover;

}());
