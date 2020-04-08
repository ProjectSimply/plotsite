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

		<?php

			$args = [
				'posts_per_page'	=> -1,
				'post_type'		=> 'performance',
				'meta_query'	=> [
					[
						'key'		=> 'artists_$_artist',
						'value'		=> $plotData['artistId'],
						'compare'   => 'LIKE'
					]
				]
			];
			$performancesQuery = new WP_Query($args);

			if($performancesQuery->have_posts()) : ?>

				<div class="artist__performances">

					<?php while($performancesQuery->have_posts()) : $performancesQuery->the_post(); ?>

						<div class="artist__performance"><?= get_field('stage')->post_title ?> <?= get_field('performance_day')['label'] ?> <?= get_field('start_time') ?></div>

					<?php endwhile; ?>

				</div>

			<?php endif; ?>

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