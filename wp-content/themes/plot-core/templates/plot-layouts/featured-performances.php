<section class="plotLayout featuredPerformances">

	<div class="maxWidth">

		<div class="featuredPerformances__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="featuredPerformances__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>

        </div>

        <?php 
        $includeDescriptions = get_field('include_descriptions');
        $perRow = get_sub_field('per_row'); ?>

        <div class="featuredPerformances__grid blockLinksGrid blockLinksGrid--<?= $perRow ?>">

        	<?php 
            foreach(get_sub_field('performances') as $performance) : 

                $post = $performance['performance'];
                setup_postdata($post);

                plotGetTemplatePart('parts/performance-listing-item',['fullWidth'=> $perRow < 2,'includeDescriptions' => $includeDescriptions]);
                wp_reset_query();

        	endforeach; 

            wp_reset_query() ?>

	    </div>

	    <?php if(get_sub_field('add_a_button')) : ?>

	    	<a href="<?= get_sub_field('button_link') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

	    <?php endif; ?>

    </div>

</section>