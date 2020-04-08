<section class="blockLinks plotLayout <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">

    <div class="maxWidth">

        <div class="blockLinks__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="blockLinks__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>
            
        </div>

        <div class="blockLinks__grid col-<?= sizeof(get_sub_field('block')) ?>">

            <?php while(has_sub_field('block')) : ?>

                <a class="plotHasHoverEffect blockLink" <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>">

                    <div class="blockLink__backgroundWrap blockLinkImageFrame">

                        <div class="blockLink__backgroundWrapInner" style="opacity: <?= get_sub_field('brightness') / 100 ?>">

                            <?php plotLazyload([
                                'image'                 => get_sub_field('image'), 
                                'imageSize'             => 'blockLink',
                                'class'                 => 'blockLink__image'
                            ]); ?>

                        </div>



                        <div class="blockLink__textWrap">

                            <?php if(get_sub_field('text')) : ?>

                                <h4 class="blockLink__heading"><?= get_sub_field('text') ?></h4>

                            <?php endif ?>

                        </div>

                    </div>

                </a>

             <?php endwhile; ?>

        </div>

    </div>

</section>