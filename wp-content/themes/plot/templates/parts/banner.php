<section class="banner <?= get_field('image_or_video') === 'video' ? 'banner--withVideo' : '' ?>">

    <?php if(get_field('image_or_video') === 'image') : ?>

        <div class="banner__image withCenteredBackgroundImage" style="background-image: url(<?= get_field('banner_image')['sizes']['banner'] ?>); opacity: <?= get_field('brightness') ? get_field('brightness') : 1; ?>"></div>

    <?php endif; ?>
                
   


    <?php if(get_field('image_or_video') === 'video') : ?>
        
        <div class="overlayForVideo" style="opacity: <?= get_field('brightness') > 0 ? 1 - get_field('brightness') : 1; ?>"></div>
        <video class="banner__video" src="<?php the_field('banner_video') ?>" autoplay loop muted playsinline></video>

    <?php endif; ?>


    <div class="banner__textWrap">
        <?php if(get_field('include_title')) : ?>
            <?php if(get_field('use_custom_title')) : ?>
                <h1 class="banner__heading"><?php the_field('custom_title'); ?></h1>
            <?php else : ?>
                <h1 class="banner__heading"><?php the_title(); ?></h1>
            <?php endif; ?>
        <?php endif ?>
        <?php if(get_field('paragraph_text')) : ?>
            <div class="banner__paragraphText"><?php the_field('paragraph_text') ?></div>
        <?php endif ?>
    </div>
       

</section>
