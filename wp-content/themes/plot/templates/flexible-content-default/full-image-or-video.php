<section class="fullImageOrVideo <?= get_sub_field('identifier') ? 'fullImageOrVideo--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>">

	<?php if(get_sub_field('background_type') === 'image') : ?>

	    <div class="fullImageOrVideo__fullScreenItem fullImageOrVideo__image" style="background-image: url(<?= get_sub_field('background_image')['sizes']['large'] ?>); opacity: <?= get_field('brightness') ? get_field('brightness') : 1; ?>"></div>

	<?php endif; ?>


    <?php if(get_sub_field('background_type') === 'video') : ?>

	    <div class="fullImageOrVideo__image" style="background-image: url(<?= get_sub_field('fallback_image')['sizes']['large'] ?>); opacity: <?= get_field('brightness') ? get_field('brightness') : 1; ?>"></div>
            
        <?php if(get_sub_field('background_video')) : ?>            
            <video class="fullImageOrVideo__fullScreenItem fullImageOrVideo__video" src="<?php the_sub_field('background_video') ?>" autoplay loop muted playsinline style="opacity: <?= get_field('brightness') ? get_field('brightness') : 1; ?>"></video>
        <?php endif ?>

	<?php endif; ?>


    <div class="fullImageOrVideo__contentWrap">

        <div class="row">

            <div class="columns">
        
                <?php if(get_sub_field('heading_text')) : ?>

                    <h3><?= get_sub_field('heading_text') ?></h3>

                <?php endif; ?>

                <?php if(get_sub_field('text')) : ?>

                    <?= get_sub_field('text') ?>
                    
                <?php endif; ?>

                <?php if(get_sub_field('link_button')) : ?>

                    <?php if(get_sub_field('link_text') && get_sub_field('link_url')) : ?>
                        <a class="button" href="<?php the_sub_field('link_url') ?>"><?php the_sub_field('link_text') ?></a>
                    <?php endif ?>

                <?php endif ?>

            </div>
        
        </div>

    </div>

</section>
