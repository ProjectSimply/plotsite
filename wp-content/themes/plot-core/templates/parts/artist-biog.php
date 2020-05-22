<div class="artist">	

	<section class="banner banner--artist withVerticalSpacing">

		<div class="banner__mediaWrap">

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

		<div class="artistBiogInner">

			<h2><?= get_the_title($plotData['artistId']) ?></h2>

			<div class="artist__performances">

				<?php if(get_field('archive'),$plotData['artistId']) : ?>

					<div class="artist__performance">This artist performed in <?= get_field('archive_y'),$plotData['artistId']) ?></div>

				<?php else : ?>

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

				<?php endif; ?>

			</div>

			<div class="content withVerticalSpacing">

				<?= get_field('biog',$plotData['artistId']) ?>

			</div>

		</div>

	</div>

</div>