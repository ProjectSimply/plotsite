<section class="fiftyFifty plotLayout fiftyFifty--<?= get_sub_field('layout_option') ?>">

    <div class="maxWidth">

        <div class="fiftyFifty__row">

            <div class="fiftyFifty__imageWrap">

                <?php plotLazyload([
                    'image'                 => get_sub_field('image'), 
                    'imageSize'             => 'fiftyFifty'
                ]); ?>

            </div>

            <div class="fiftyFifty__textWrap">

                <?php if(get_sub_field('heading')) : ?>

                    <h2 class="fiftyFifty__heading"><?php the_sub_field('heading') ?></h2>

                <?php endif ?>

                <?php if(get_sub_field('content')) : ?>

                    <div class="fiftyFifty__content">
                        <?= get_sub_field('content') ?>
                    </div>

                <?php endif ?>

                <?php if(get_sub_field('add_link_button')) : ?>

                    <a <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

                <?php endif; ?>

            </div>

        </div>

    </div>

</section>