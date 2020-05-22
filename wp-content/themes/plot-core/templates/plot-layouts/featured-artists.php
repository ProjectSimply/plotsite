<section class="plotLayout featuredArtists">

	<div class="maxWidth">

		<div class="featuredArtists__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="featuredArtists__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>

        </div>

        <div class="featuredArtists__grid blockLinksGrid blockLinksGrid--<?= sizeof(get_sub_field('artists')) ?>">

        	<?php $args = [
        					'post__in' 		=> [],
        					'post_type'		=> 'artist',
        					'post_status'	=> 'publish'
        				  ];

        	while(has_sub_field('artists')) : 

        		$args['post__in'][] = get_sub_field('artist');

        	endwhile; ?>

        	<?php $artistsQuery = new WP_Query($args); ?>

			<?php while($artistsQuery->have_posts()) : $artistsQuery->the_post(); 

				plotGetTemplatePart('parts/artist-block');

			endwhile; ?>

			<?php wp_reset_query() ?>

	    </div>

	    <?php if(get_sub_field('add_a_button')) : ?>

	    	<a href="<?= get_sub_field('button_link') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

	    <?php endif; ?>

    </div>

</section>