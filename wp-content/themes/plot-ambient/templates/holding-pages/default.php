<div class="holdingPage">

	<div class="holdingPage__backgroundWrap">

		<div class="holdingPage__backgroundImageWrap" style="opacity: <?= get_field('background_brightness') / 100 ?>">

			<?php if(get_field('background_type') == 'image') : ?>

				<?php plotLazyload([
					'image' 				=> get_field('background_image'), 
					'imageSize'				=> 'banner', 
					'smallScreenImage' 		=> get_field('small_screen_background_image'), 
					'smallScreenImageSize'	=> 'banner--small-screen',
					'class'					=> 'holdingPage__backgroundImage'
				]); ?>

			<?php else : ?>

				<?php plotLazyload([
					'video' 				=> get_field('background_video'), 
					'smallScreenVideo' 		=> get_field('small_screen_background_video'),
					'class'					=> 'holdingPage__backgroundVideo'
				]); ?>


			<?php endif; ?>

		</div>

	</div>

	<div class="holdingPage__contentWrap">

		<div class="maxWidth">

			<div class="holdingPage__contentBox <?= 'align-' . get_field('plotcms_horizontal_alignment') ?> <?= 'holdingPage__contentBox--' . get_field('plotcms_content_box_style') ?>">

				<?php if(get_field('include_a_logo')) : ?>

					<a class="holdingPage__logo" href="/">

						<img alt="<?= get_bloginfo('title') ?>" src="<?= get_field('logo')['sizes']['large'] ?>" />

					</a>

				<?php endif; ?>

				<?php if(get_field('include_a_heading')) : ?>

					<h1 class="holdingPage__title"><?= get_field('heading') ?></h1>

				<?php endif; ?>

				<?php if(get_field('include_a_statement')) : ?>

					<div class="holdingPage__statement"><?= get_field('statement') ?></div>

				<?php endif; ?>

				<?php if(get_field('include_a_form')) : ?>

					<div class="holdingPage__form">
						<?= do_shortcode('[wpforms id="' . get_field('form') . '"]'); ?>	
					</div>

				<?php endif; ?>

				<?php if(get_field('include_social_media_links')) : ?>

					<div class="holdingPage__socialLinks">

						<?php plotGetTemplatePart('parts/social-links') ?>

					</div>

				<?php endif; ?>

				<?php if(get_field('site_status','option') == 'splash') : ?>

					<div class="holdingPage__viewFullSite">

						<a href="/?sh=1">View full site</a>

					</div>

				<?php endif; ?>

			</div>

		</div>

	</div>

</div>