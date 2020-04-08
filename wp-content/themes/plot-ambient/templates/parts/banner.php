<?php if(isset($plotData['postId'])) : ?>
	<?php $id = get_post($plotData['postId']); ?>
<?php else : ?>
	<?php $id = get_the_ID(); ?>
<?php endif; ?>

<?php if(get_field('banner_type',$id) != 'text') : ?>

	<div class="banner sectionWithVerticalSpacing <?= get_field('plotcms_banner_height',$id) ? 'banner--' . get_field('plotcms_banner_height',$id) : '' ?> <?= get_field('plotcms_banner_width',$id) == 'maxWidth' ? 'maxWidth' : '' ?>">

		<?php if(get_field('banner_link')) : ?>

			<a class="bannerInner" href="<?= get_field('banner_link',$id) ?>" <?= get_field('banner_link_open_in_new_tab',$id) ? 'target="_blank"' : '' ?>>

		<?php else : ?>

			<div class="bannerInner">

		<?php endif; ?>

			<div class="banner__backgroundWrap" style="opacity: <?= get_field('brightness',$id) / 100 ?>">

				<?php if(get_field('banner_type') == 'image') : ?>

					<?php plotLazyload([
						'image' 				=> get_field('banner_image',$id), 
						'imageSize'				=> 'banner', 
						'smallScreenImage' 		=> get_field('small_screen_banner_image',$id), 
						'smallScreenImageSize'	=> 'banner--small-screen',
						'class'					=> 'banner__image'
					]); ?>

				<?php else : ?>

					<?php plotLazyload([
						'video' 				=> get_field('banner_video',$id), 
						'smallScreenVideo' 		=> get_field('small_screen_banner_video',$id),
						'class'					=> 'banner__video'
					]); ?>


				<?php endif; ?>

			</div>

			<div class="banner__contentWrap <?= get_field('plotcms_banner_text_horizontal_alignment',$id) ? 'align-' . get_field('plotcms_banner_text_horizontal_alignment',$id) : '' ?> <?= get_field('plotcms_banner_text_vertical_alignment',$id) ? 'align-' . get_field('plotcms_banner_text_vertical_alignment',$id) : '' ?>">

				<div class="maxWidth">
					
					<?php if( is_category() ) : ?>

						<h1 class="banner__title"><?= get_queried_object()->name; ?> Articles</h1>

					<?php else : ?>

						<?php if(get_field('banner_title')) : ?>

							<h1 class="banner__title"><?= get_field('banner_title',$id) ?></h1>

						<?php endif; ?>

						<?php if(get_field('plotcms_banner_subheading')) : ?>

							<p class="banner__subheading"><?= get_field('plotcms_banner_subheading',$id) ?></p>

						<?php endif; ?>

						<?php if(get_field('show_button')) : ?>

							<div class="plotButton banner__button"><?= get_field('button_text',$id) ?></div>

						<?php endif; ?>

					<?php endif; ?>

				</div>

			</div>

		<?php if(get_field('banner_link',$id)) : ?>

			</a>

		<?php else : ?>

			</div>

		<?php endif; ?>

	</div>

<?php else : ?>

	<div class="textOnlyBanner banner sectionWithVerticalSpacing">

		<div class="banner__contentWrap <?= get_field('plotcms_banner_text_horizontal_alignment',$id) ? 'align-' . get_field('plotcms_banner_text_horizontal_alignment',$id) : '' ?>">

			<div class="maxWidth">

				<?php if( is_category() ) : ?>

					<h1 class="textOnlyBanner__title"><?= get_queried_object()->name; ?> Articles</h1>

				<?php else : ?>

					<h1 class="textOnlyBanner__title"><?= get_field('banner_title',$id) ?></h1>

				<?php endif; ?>

			</div>

		</div>

	</div>	

<?php endif; ?>
