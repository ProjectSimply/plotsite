<?php $latestNewsItems = psGetLatestPosts('post', get_sub_field('how_many_articles')) ?>

<?php if($latestNewsItems->have_posts()) : ?>

    <section class="latestArticles section<?= get_sub_field('colour_scheme') ?> <?= get_sub_field('identifier') ? 'latestArticles--' . get_sub_field('identifier') : '' ?>">

        <?php if(get_sub_field('heading') || get_sub_field('intro_content')) : ?>
            <div class="row">
                <div class="columns">
                    <?php if(get_sub_field('heading')) : ?>
                        <h2 class="scrollItem plotSectionHeading textCenter"><?php the_sub_field('heading') ?></h2>
                    <?php endif ?>
                    <?php if(get_sub_field('intro_content')) : ?>
                        <div class="scrollItem"><?php the_sub_field('intro_content') ?></div>
                    <?php endif ?>
                </div>
            </div>
        <?php endif ?>

        <div class="row">

            <?php while($latestNewsItems->have_posts()) :  $latestNewsItems->the_post() ?>
            
                <div class="columns medium-6">
                    <?php get_template_part('templates/parts/article') ?>
                </div>

            <?php endwhile ?>
            <?php wp_reset_query() ?>

        </div>

        <?php if(get_sub_field('add_link_button')) : ?> 
            <div class="row">
                <div class="columns textCenter">                 
                    <a class="scrollItem plotBorderButton plotBorderButton--pink" href="<?php the_sub_field('link_url') ?>"><?php the_sub_field('button_text') ?></a>
                </div>
            </div>
        <?php endif ?>
        

    </section>

<?php endif ?>
