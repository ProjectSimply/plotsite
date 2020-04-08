<section class="plotLayout latestArticles <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">

	<div class="maxWidth">

		<div class="latestArticles__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="latestArticles__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?= get_sub_field('introduction') ?>

        </div>

        <?php $articlesCount = get_sub_field('which_articles_to_show') == 'custom' ? sizeof(get_sub_field('articles')) : get_sub_field('article_count'); ?>

        <div class="latestArticles__grid col-<?= $articlesCount ?>">

	        <?php 

	        	$args = [
	        		'posts_per_page'	=> get_sub_field('article_count')
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

	        		<?= plotGetTemplatePart('parts/news-block',['postId' => get_the_ID()]) ?>

	        	<?php endwhile; ?>

	        	<?php wp_reset_query(); ?>

	    </div>

	    <?php if(get_sub_field('add_a_button')) : ?>

            <div class="buttonWrap centered">

	    	  <a href="<?= get_sub_field('button_link') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

            </div>

	    <?php endif; ?>

    </div>

</section>