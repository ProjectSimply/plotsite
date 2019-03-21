(function (){

    'use strict';

	var $ 	        = require('jquery'),	
	    RevealWordByWord;

	RevealWordByWord = {

		init: function() {	 

            $('.revealWordByWord').each(function(){

                var elem = $('.revealWordByWordParts',this);

                var words = elem.text().split(" ");
                elem.empty();
                $.each(words, function(i, v) {
                    elem.append("<span><span>" + v + " </span></span>");
                });

            });         
            
        }
        
	}

	module.exports = RevealWordByWord;

}());
