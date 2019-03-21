(function($){
	
	
	function initialize_field( $el ) {
		
		//$el.doStuff();
		
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/
		
		acf.add_action('ready append', function( $el ){
			
			// search $el for fields of type 'lineup'
			acf.get_fields({ type : 'lineup'}, $el).each(function(){
				
				initialize_field( $(this) );
				
			});
			
		});
		
		
	} else {
		
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM. 
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			
			$(postbox).find('.field[data-field_type="lineup"]').each(function(){
				
				initialize_field( $(this) );
				
			});
		
		});
	
	
	}

})(jQuery);


(function($){

	setTimeout(lineupEditorPreview, 2000);


	function lineupEditorPreview() {

		var editor = $('#lineupEditor'),
			preview = $('#lineupPreview'),
			output = '';

		$(editor).on('keyup', function () {
			populatePreview(this);
		});

		$(document).ready(function () {
			populatePreview($(editor));
		});

		$('.JS-lineupPreviewButtons').on('click', '.JS-lineupPreviewMobile', function(){
			$('.JS-lineupPreviewButtons .button').removeClass('disabled');

			$(this).addClass('disabled');

			$('.lineupPreview__container').addClass('mobile');
		});

		$('.JS-lineupPreviewButtons').on('click', '.JS-lineupPreviewDesktop', function(){
			$('.JS-lineupPreviewButtons .button').removeClass('disabled');

			$(this).addClass('disabled');
			$('.lineupPreview__container').removeClass('mobile');
		});


		function makeUL(array, iterator) {
			// Create the list
			var list = document.createElement('ul');

			//match with front-end classes
			list.className += 'lineup__tier lineup__tier--' + iterator;

			for (var i = 0; i < array.length; i++) {

				var str = array[i];

				// Wrap straplines with span
				str = str.replace("[", "<span class='lineup__strap'>").replace("]", "</span>");

				// Linebreak
				str = str.replace("|mobile|", "<br class='mobile-only'>");
				str = str.replace("|desktop|", "<br class='desktop-only'>");
				str = str.replace("||", "<br>");

				// Visible separators
				str = str.replace("*mobile*", "<span class='separator mobile-only'></span>");
				str = str.replace("*desktop*", "<span class='separator desktop-only'></span>");
				str = str.replace("**", "<span class='lineup__separator lineup__separator'" + iterator + "'></span>");

				// Create the list item:
				var item = document.createElement('li');

				//match with front-end classes
				item.className += 'lineup__act lineup__act-' + iterator;

				// Push in the string
				$(item).html(str);

				// Add it to the list:
				$(list).append(item);

			}

			// Return the list:
			return list;
		}

		function populatePreview(input) {
			var input = $(input).val(),
				output = "";

			// clear he preview
			$(preview).html('');

			// Split up the tiers
			var tiers = input.split("***");

			for (var i = 0; i < tiers.length; i++) {
				var tier = tiers[i];

				// Split up the artists
				tier = tier.split(">");

				//pass an iterator to the makeUL function to use to match our front-end classes
				var iterator = i + 1;

				tier = makeUL(tier, iterator);

				$(preview).append(tier);
			}

		}
	}

})(jQuery);
