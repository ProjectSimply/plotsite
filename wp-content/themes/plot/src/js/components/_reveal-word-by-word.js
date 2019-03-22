(function (){

    'use strict';

	var $ 	        = require('jquery'),	
	    RevealWordByWord;

	RevealWordByWord = {

		init: function() {	 

            $('.revealWordByWord').each(function(){

                var elem = $('.revealWordByWordParts',this)[0];

                elem.innerHTML = elem.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word"><span>$2</span></span>');
            });         
            
        }
        
	}

	module.exports = RevealWordByWord;

}());
