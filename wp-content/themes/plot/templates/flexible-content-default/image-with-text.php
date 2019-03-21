<?php $layout = get_sub_field('layout_option') ?>

<section class="imageWithText <?= get_sub_field('identifier') ? 'imageWithText--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>">    

    <div class="row">

        <div class="columns medium-6 imageWithText__imageCol <?= $layout === 'right' ? 'imageWithText__imageCol--right' : '' ?>">
            
            <?php if(get_sub_field('image')) : ?>
                <img class="scrollItem" src="<?= get_sub_field('image')['sizes']['medium'] ?>" alt="<?php the_sub_field('heading') ?>">
            <?php endif ?>

        </div>

        <div class="columns medium-6">

            <div class="scrollItem">

                <?php if(get_sub_field('heading')) : ?>
                    <h3><?php the_sub_field('heading') ?></h3>
                <?php endif ?>

                <?php if(get_sub_field('content')) : ?>
                    <?php the_sub_field('content') ?>
                <?php endif ?>

                <?php if(get_sub_field('link_button')) : ?>                
                    <a class="plotBorderButton plotBorderButton--blue" href="<?php the_sub_field('link_url') ?>"><?php the_sub_field('button_text') ?></a>
                <?php endif ?>
        
            </div>

        </div>

    </div>

</section>
