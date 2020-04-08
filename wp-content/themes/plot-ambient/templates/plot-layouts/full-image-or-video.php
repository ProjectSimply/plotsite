<section class="plotLayout fullImageOrVideo fullImageOrVideo--<?= get_sub_field('plotcms_height') ?> 

	<?php if(get_sub_field('plotcms_width') == 'maxWidth') : ?>

		hasMaxWidth

		<?php if(get_sub_field('plotcms_color_scheme') == 'alternative' ) : ?>

			altColourScheme

		<?php endif; ?>

	<?php endif; ?>

	">

	<?php if(get_sub_field('plotcms_width') == 'maxWidth') : ?>

		<div class="maxWidth">

	<?php endif; ?>

	<?php if(get_sub_field('link_type') == 'segment') : ?>

		<a class="fullImageOrVideoInner" href="<?= get_sub_field('link_url') ?>" <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?>>

	<?php else : ?>

		<div class="fullImageOrVideoInner">

	<?php endif; ?>

		<div class="fullImageOrVideo__backgroundWrap" style="opacity: <?= get_sub_field('brightness') / 100 ?>">

			<?php if(get_sub_field('background_type') == 'image') : ?>

				<?php plotLazyload([
					'image' 				=> get_sub_field('background_image'), 
					'imageSize'				=> 'banner', 
					'smallScreenImage' 		=> get_sub_field('small_screen_background_image'), 
					'smallScreenImageSize'	=> 'banner--small-screen',
					'class'					=> 'fullImageOrVideo__image'
				]); ?>

			<?php else : ?>

				<?php plotLazyload([
					'video' 				=> get_sub_field('background_video'), 
					'smallScreenVideo' 		=> get_sub_field('small_screen_background_video'),
					'class'					=> 'fullImageOrVideo__video'
				]); ?>


			<?php endif; ?>

		</div>

		<div class="fullImageOrVideo__contentWrap <?= get_field('plotcms_banner_text_horizontal_alignment') ? 'fullImageOrVideo__contentWrap--' . get_sub_field('plotcms_text_horizontal_alignment') : '' ?> <?= get_field('plotcms_banner_text_vertical_alignment') ? 'fullImageOrVideo__contentWrap--' . get_sub_field('plotcms_text_vertical_alignment') : '' ?>">

			<div class="maxWidth"> 

				<?php if(get_sub_field('title')) : ?>

					<h2 class="fullImageOrVideo__title"><?= get_sub_field('title') ?></h2>

				<?php endif; ?>

				<?php if(get_sub_field('paragraph')) : ?>

					<?= get_sub_field('paragraph') ?>

				<?php endif; ?>

				<?php if(get_sub_field('link_type') == 'button') : ?>

					<a <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

				<?php endif; ?>

				<?php if(get_sub_field('add_button') && get_sub_field('link_type') == 'segment') : ?>

					<span class="plotButton"><?= get_sub_field('button_text') ?></span>

				<?php endif; ?>	

			</div>

		</div>


	<?php if(get_sub_field('link_type') == 'segment') : ?>

		</a>

	<?php else : ?>

		</div>

	<?php endif; ?>

	<?php if(get_sub_field('plotcms_width') == 'maxWidth') : ?>

		</div>

	<?php endif; ?>

</section>