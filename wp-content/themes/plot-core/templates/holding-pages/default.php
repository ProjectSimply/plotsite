<div class="holdingPage">

	<div class="holdingPage__backgroundWrap">

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

	<div class="holdingPage__contentWrap">

		<div class="maxWidth">

			<div class="holdingPage__contentBox">

				<?php if(get_field('heading')) : ?>

					<h1 class="holdingPage__title"><?= get_field('heading') ?></h1>

				<?php endif; ?>

				<?php if(get_field('statement')) : ?>

					<div class="holdingPage__statement"><?= get_field('statement') ?></div>

				<?php endif; ?>

				<?php if(get_field('include_a_form')) : ?>

					<div class="holdingPage__form">
						<?= do_shortcode('[wpforms id="' . get_field('include_a_form') . '"]'); ?>	
					</div>

				<?php endif; ?>

				<div class="holdingPage__socialLinks">

					<?php plotGetTemplatePart('parts/social-links') ?>

				</div>

				<?php if(get_field('site_status','option') == 'splash') : ?>

					<div class="holdingPage__viewFullSite">

						<a href="/?sh=1">View full site</a>

					</div>

				<?php endif; ?>

			</div>

		</div>

	</div>

</div>