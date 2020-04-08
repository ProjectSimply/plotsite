<section class="blockLinks plotLayout">

    <div class="maxWidth">

        <div class="blockLinks__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="blockLinks__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif; ?>
            
        </div>

        <div class="blockLinks__grid blockLinks__grid--with<?= sizeof(get_sub_field('block')) ?>">

            <?php while(has_sub_field('block')) : ?>

                <a class="blockLink" <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>">

                    <div class="blockLink__backgroundWrap">

                        <div class="blockLink__backgroundWrapInner" style="opacity: <?= get_sub_field('brightness') / 100 ?>">

                            <?php plotLazyload([
                                'image'                 => get_sub_field('image'), 
                                'imageSize'             => 'blockLink',
                                'class'                 => 'blockLink__image'
                            ]); ?>

                        </div>

                    </div>

                    <div class="blockLink__textWrap">

                        <?php if(get_sub_field('text')) : ?>

                            <h3 class="blockLink__heading"><?= get_sub_field('text') ?></h3>

                        <?php endif ?>

                    </div>

                </a>

             <?php endwhile; ?>

        </div>

    </div>

</section>