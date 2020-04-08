<div class="artist">	

	<section class="banner banner--artist sectionWithVerticalSpacing">

		<div class="banner__backgroundWrap">

			<?php plotLazyload([
				'image' 				=> get_field('banner_image',$plotData['artistId']), 
				'imageSize'				=> 'banner', 
				'smallScreenImage' 		=> get_field('small_screen_banner_image',$plotData['artistId']), 
				'smallScreenImageSize'	=> 'banner--small-screen',
				'class'					=> 'banner__image'
			]); ?>

		</div>

	</section>

	<div class="maxWidth">

		<h2><?= get_the_title($plotData['artistId']) ?></h2>

		<div class="artist__performances">

			<?php while(has_sub_field('performances',$plotData['artistId'])) : ?>

				<div class="artist__performance">

					<?php $startDateTime = DateTime::createFromFormat('d/m/Y g:i a', get_sub_field('start_time')); ?>

					<div class="artist__performanceDate"><?= $startDateTime->format(DATE_FORMAT) ?></div>

					<div class="artist__performanceTime">
						<?= $startDateTime->format('H:i') ?> - 

						<?= $startDateTime->add(new DateInterval('PT' . get_sub_field('performance_length') . 'M'))->format('H:i'); ?>
					</div>

					<div class="artist__performanceStage"><?= get_sub_field('stage')->post_title ?></div>


				</div>

			<?php endwhile; ?>

		</div>

		<div class="content">

			<?= get_field('biog',$plotData['artistId']) ?>

		</div>

		<?php if(get_field('instagram') || get_field('spotify') || get_field('facebook')) : ?>

			<div class="artist__socialLinks">

				<?php if(get_field('instagram')) : ?>

					<a target="_blank" href="<?= get_field('instagram') ?>">INSTAGRAM</a>

				<?php endif; ?>


				<?php if(get_field('spotify')) : ?>

					<a target="_blank" href="<?= get_field('spotify') ?>">SPOTIFY</a>

				<?php endif; ?>


				<?php if(get_field('facebook')) : ?>

					<a target="_blank" href="<?= get_field('facebook') ?>">FACEBOOK</a>

				<?php endif; ?>

			</div>

		<?php endif; ?>

	</div>

</div>