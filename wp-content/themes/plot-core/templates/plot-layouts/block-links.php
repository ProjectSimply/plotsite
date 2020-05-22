<section class="blockLinks plotLayout">

    <div class="maxWidth">

        <div class="blockLinks__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="blockLinks__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>
            
        </div>

        <div class="blockLinksGrid blockLinksGrid--<?= sizeof(get_sub_field('block')) ?>">

            <?php while(has_sub_field('block')) : ?>

                <a class="plotHasHoverEffect blockLink plotWithImageTransition" data-plot-smooth-scroll-reveal <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>">

                    <div class="blockLinkImageFrame">
  
                            <?php plotLazyload([
                                'image'                 => get_sub_field('image'), 
                                'imageSize'             => 'blockLink',
                                'class'                 => 'blockLink__image',
                                'opacity'               => get_sub_field('brightness') / 100
                            ]); ?>


                    </div>

                    <div class="blockLink__textWrap">

                        <?php if(get_sub_field('text')) : ?>

                            <h4 class="blockLink__heading"><?= get_sub_field('text') ?></h4>

                        <?php endif ?>

                    </div>

                </a>

             <?php endwhile; ?>

        </div>

    </div>

</section>