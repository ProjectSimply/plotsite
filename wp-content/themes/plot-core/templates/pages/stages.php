<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

	<?php if(checkPostIsInMenu('Lineup Pages')) : ?>

		<?php plotGetTemplatePart('parts/lineup-submenu'); ?>

	<?php endif; ?>

	<div class="maxWidth">

		<div class="stagesWrap stagesWrap--<?= get_field('plotcms_alignment') ?>">

			<?php if( get_field('listings_type') == 'auto') : ?>
			
				<?php $schedule = plotGenerateSchedule(); ?>

				<?php foreach($schedule as $date => $day) : ?>

					<div class="stages__day stages__day--<?= get_field('listings_style') ?>">

						<h2><?= $day['dateText'] ?></h2>

						<div class="stages__grid">
						
							<?php foreach($day['stages'] as $stageId => $stage) : ?>

								<div class="stages__column">

									<div class="stages__panel">

										<h3 class="stages__stageTitle"><?= $stage['stageName'] ?></h3>

										<?php if(get_field('listings_style') == 'text') : ?>

											<ul class="stages__artistList">

												<?php foreach(array_reverse($stage['performances']) as $performance) : ?>

													<li><?= plotMakePerformanceTitle($performance) ?></li>

												<?php endforeach; ?>

											</ul>

										<?php else : ?>

											<div class="performancesGrid">

												<?php foreach(array_reverse($stage['performances']) as $performance) : ?>

													<div class="performanceBlock">

														<?php plotLazyload([
															'image' 				=> plotGetPerformanceImage($performance['id']), 
															'imageSize'				=> 'blockLink', 
															'class'					=> 'artistBlock__image'
														]);  ?>

														<h4><?= plotMakePerformanceTitle($performance['id']) ?></h4>

													</div>

												<?php endforeach; ?>

											</div>

										<?php endif; ?>

									</div>

								</div>

							<?php endforeach; ?>

						</div>

					</div>

				<?php endforeach; ?>

			<?php elseif(get_field('split_by_day')) : ?>

				<?php while(has_sub_field('listings_by_day')) : ?>

					<div class="stages__day">

						<h2><?= get_sub_field('listings_day')['label'] ?></h2>

						<div class="stages__grid">
						
							<?php while(has_sub_field('stages')) : ?>

								<div class="stages__column">

									<div class="stages__panel">

										<h3 class="stages__stageTitle"><?= get_sub_field('stage')->post_title ?></h3>

										<ul class="stages__artistList">

										<?php while(has_sub_field('performances')) : ?>

											<li><?= plotMakePerformanceTitle(get_sub_field('performance')->ID); ?></li>

										<?php endwhile; ?>

										</ul>

									</div>

								</div>

							<?php endwhile; ?>

						</div>

					</div>

				<?php endwhile; ?>

			<?php else : ?>

				<div class="stages__day">

					<div class="stages__grid">
					
						<?php while(has_sub_field('listings_by_stage')) : ?>

							<div class="stages__column">

								<div class="stages__panel">

									<h3 class="stages__stageTitle"><?= get_sub_field('stage')->post_title ?></h3>

									<ul class="stages__artistList">

									<?php while(has_sub_field('performances')) : ?>

										<li><?= plotMakePerformanceTitle(get_sub_field('performance')->ID); ?></li>

									<?php endwhile; ?>

									</ul>

								</div>

							</div>

						<?php endwhile; ?>

					</div>

				</div>

			<?php endif; ?>

		</div>
		
	</div>

<?php plotGetTemplatePart('parts/footer') ?>
