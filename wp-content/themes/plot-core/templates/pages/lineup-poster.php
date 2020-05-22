<?php plotGetTemplatePart('parts/banner') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<div data-plot-smooth-scroll-frame class="lineupPoster plotPage">

	<div class="maxWidth">

		<?php plotLazyload([
			'image' 				=> get_field('lineup_poster'), 
			'imageSize'				=> 'large', 
			'smallScreenImage' 		=> get_field('small_screen_lineup_poster'), 
			'smallScreenImageSize'	=> 'medium',
			'class'					=> 'lineupPoster__image'
		]); ?>

	</div>
	
</div>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 