<div class="performance" data-performance-id="<?= get_the_ID() ?>">

	<div class="performance__blockLink">
		<?php 

		$includeDescriptions = !empty($plotData['includeDescriptions']) ? $plotData['includeDescriptions'] : true;

		$blockLinkData = [
		    'url'          	=> get_permalink(),
		    'image'        	=> plotGetPerformanceImage(get_the_ID()),
		    'imageSize'    	=> !empty($plotData['fullWidth']) ? 'banner' : 'blockLink',
		    'imageSizeSmall'=> !empty($plotData['fullWidth']) ? 'banner--small-screen' : 'blockLink'		  
	    ];

		plotGetTemplatePart('parts/block-link',$blockLinkData);

	    ?>
	</div>

	<div class="performance__info">

		<?php if(get_field('stage') || get_field('performance_day')) : ?>

			<div class="performanceMeta meta">

				<?php if(get_field('stage')) : ?>

					<?= get_field('stage')->post_title; ?>

				<?php endif; ?>

				<?= plotFormatDate(get_field('day')) ?> <?= get_field('start_time') ?>

			</div>

		<?php endif; ?>

		<h5 class="performance__title"><?= plotMakePerformanceTitle(get_the_ID(),'performance') ?></h5>

		<?php if(get_field('description') && $includeDescriptions) : ?>

			<a href="<?= get_permalink() ?>" class="performance__content">

				<?= get_field('description'); ?>

			</a>

		<?php endif; ?>


		<?php if(get_field('individual_tickets') ) : ?>

			<div class="performance__buttonWrap">

				<a target="_blank" href="<?= get_field('link_url') ?>" class="performance__button plotButton"><?= get_field('button_text',get_the_ID()) ?></a>

			</div>

		<?php endif; ?>

		<?php $artistTypes = get_the_terms(get_the_ID(),'artist-type'); ?>

		<?php if($artistTypes) : ?>

			<div class="artistTypesForArtist">

				<?php foreach($artistTypes as $artistType) :  ?>

					<a href="<?= get_permalink(409) ?>?artist-type=<?= $artistType->term_id ?>" class="plotButton artistBlock__type" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></a>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>

	</div>

</div>