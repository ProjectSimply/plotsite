<?php plotGetTemplatePart('parts/banner') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

	<div data-plot-smooth-scroll-frame class="maxWidth plotPage">

		<div class="stagesWrap">

			<?php if( get_field('listings_type') == 'auto') : ?>
			
				<?php $schedule = plotGenerateSchedule(); ?>

				<?php foreach($schedule as $date => $day) : ?>

					<div class="stages__day stages__day--<?= get_field('listings_style') ?> stages__day--text-with<?= get_field('desktop_columns_text') ?>">

						<h2><?= $day['dateText'] ?></h2>

						<div class="stages__grid">
						
							<?php foreach($day['stages'] as $stageId => $stage) : ?>

								<?php plotGetTemplatePart('parts/stage-listing',[
															'stageId'		=> $stageId,
															'stageName'  	=> $stage['stageName'],
															'performances' 	=> array_reverse($stage['performances'])
															]); ?>

							<?php endforeach; ?>

						</div>

					</div>

				<?php endforeach; ?>

			<?php elseif(get_field('split_by_day')) : ?>

				<?php while(has_sub_field('listings_by_day')) : ?>

					<div class="stages__day stages__day--<?= get_field('listings_style') ?> stages__day--text-with<?= get_field('desktop_columns_text') ?>">

						<h2><?= get_sub_field('listings_day')['label'] ?></h2>

						<div class="stages__grid">
						
							<?php while(has_sub_field('stages')) : ?>

								<?php plotGetTemplatePart('parts/stage-listing',[
															'stageId'		=> get_sub_field('stage')->ID,
															'stageName'  	=> get_sub_field('stage')->post_title,
															'performances' 	=> get_sub_field('performances')
															]); ?>

							<?php endwhile; ?>

						</div>

					</div>

				<?php endwhile; ?>

			<?php else : ?>

				<div class="stages__day stages__day--<?= get_field('listings_style') ?> stages__day--text-with<?= get_field('desktop_columns_text') ?>">

					<div class="stages__grid">
					
						<?php while(has_sub_field('listings_by_stage')) : ?>

							<?php plotGetTemplatePart('parts/stage-listing',[
															'stageId'		=> get_sub_field('stage')->ID,
															'stageName'  	=> get_sub_field('stage')->post_title,
															'performances' 	=> get_sub_field('performances')
															]); ?>

						<?php endwhile; ?>

					</div>

				</div>

			<?php endif; ?>

		</div>
		
	</div>