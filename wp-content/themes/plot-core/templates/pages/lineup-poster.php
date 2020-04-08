<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<?php if(checkPostIsInMenu('Lineup Pages')) : ?>

	<?php plotGetTemplatePart('parts/lineup-submenu'); ?>

<?php endif; ?>

<div class="lineupPoster">

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

<?php plotGetTemplatePart('parts/footer') ?>
