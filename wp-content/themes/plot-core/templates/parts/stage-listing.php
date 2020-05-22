<div class="stages__column">

	<div class="stages__panel">
		
		<div class="stages__stageInfo">

			<?php if(get_field('listing_image',$plotData['stageId']) && get_field('add_stage_imagery')) : ?>

				<?php if(plotHasStagePages()) : ?>
					<a href="<?= get_permalink($plotData['stageId']) ?>">
				<?php endif; ?>

					<div class="stages__stageImageWrap <?= plotHasStagePages() ? 'plotHasHoverEffect' : ''; ?>">
						
						<?php plotLazyload([
							'image' 				=> get_field('listing_image',$plotData['stageId']), 
							'imageSize'				=> 'fiftyFifty', 
							'class'					=> 'stages__stageImage'
						]);  ?>

					</div>

				<?php if(plotHasStagePages()) : ?>
					</a>
				<?php endif; ?>

			<?php endif; ?>

			<div class="stages__text">

				<h2 class="stages__stageTitle"><?= $plotData['stageName'] ?></h2>

				<?php if(get_field('description',$plotData['stageId']) && get_field('add_stage_descriptions')) : ?>

					<div class="stages__stageDescription">

						<?= get_field('description',$plotData['stageId']) ?>

					</div>

				<?php endif; ?>

				<?php if(plotHasStagePages()) : ?>
					
					<a href="<?= get_permalink($plotData['stageId']) ?>" class="plotButton stages__button"><?= get_field('stage_read_more_text') ?></a>

				<?php endif; ?>

			</div>

		</div>

		<?php if(get_field('listings_style') == 'text') : ?>

			<ul class="stages__artistList">

				<?php foreach(array_reverse($plotData['performances']) as $performance) : ?>

					<li>
						<?php if(get_field('show_performance_times')) : ?>

							<?= plotPerformanceTime(plotNormalisePerformanceData($performance)) ?>

						<?php endif; ?>

						<?= plotMakePerformanceTitle(plotNormalisePerformanceData($performance)) ?></li>

				<?php endforeach; ?>

			</ul>

		<?php else : ?>

			<div class="blockLinksGrid blockLinksGrid--<?= get_field('desktop_columns_image') ?> col-<?= get_field('desktop_columns_image') ?>">

				<?php foreach($plotData['performances'] as $performance) : ?>

					<?php plotGetTemplatePart('parts/performance-block',['id' =>plotNormalisePerformanceData($performance)]); ?>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>

	</div>

</div>