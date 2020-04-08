<section class="plotLayout latestArticles">

	<div class="maxWidth">

		<div class="latestArticles__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="latestArticles__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?= get_sub_field('introduction') ?>

        </div>

        <div class="latestArticles__grid">

	        <?php 

	        	$args = [
	        		'posts_per_page'	=> 3
	        	];

	        	if(get_sub_field('which_articles_to_show') == 'custom') : 

	        		$args['post__in'] = [];
	        		$args['orderby'] = 'post__in';

	        		while(has_sub_field('articles'))
	        			$args['post__in'][] = get_sub_field('article');

	        	endif;

	        	$latestArticles = new WP_Query($args);

	        	while($latestArticles->have_posts()) : $latestArticles->the_post(); ?>

	        		<?= plotGetTemplatePart('parts/news-block') ?>

	        	<?php endwhile; ?>

	        	<?php wp_reset_query(); ?>

	    </div>

    </div>

</section>