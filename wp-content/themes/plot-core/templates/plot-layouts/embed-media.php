<section class="plotLayout embedMedia">

    <div class="maxWidth">

        <div class="embedMedia__textWrap">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="embedMedia__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <div class="embedMedia__content">
                    <?= get_sub_field('introduction') ?>
                </div>

            <?php endif ?>

        </div>

        <div class="embedMedia__container">
            <?= get_sub_field('embed'); ?>
        </div>

    </div>

</section>


