<section class="plotLayout plotLayout--narrow embedMedia">

    <div class="maxWidth">

        <div class="embedMedia__textWrap">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="embedMedia__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif ?>

        </div>

        <div class="embedMedia__container">
            <?= get_sub_field('embed'); ?>
        </div>

    </div>

</section>


