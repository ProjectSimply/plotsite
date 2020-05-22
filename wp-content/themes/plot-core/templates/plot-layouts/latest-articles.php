<section class="plotLayout latestArticles">

	<div class="maxWidth">

		<div class="latestArticles__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="latestArticles__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>

        </div>

        <?php $articlesCount = get_sub_field('which_articles_to_show') == 'custom' ? sizeof(get_sub_field('articles')) : get_sub_field('article_count'); ?>

        <div class="latestArticles__grid blockLinksGrid blockLinksGrid--<?= $articlesCount ?>">

	        <?php 

	        	$args = [
	        		'posts_per_page'	=> 3
	        	];

	        	if(get_sub_field('which_articles_to_show') == 'custom') : 

	        		$args['post__in'] = [];
	        		$args['posts_per_page'] = -1;
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