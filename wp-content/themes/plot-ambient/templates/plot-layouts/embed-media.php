<section class="embedMedia fluidContent plotLayout <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">


    <div class="maxWidth">

        <div class="embedMedia__textWrap fluidContent__inner fluidContent__inner--<?= get_sub_field('plotcms_position'); ?>">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="embedMedia__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <div class="embedMedia__content">
                    <?= get_sub_field('introduction') ?>
                </div>

            <?php endif ?>

            <div class="embedMedia__container">
                <?= get_sub_field('embed'); ?>
            </div>
            

        </div>

    </div>

</section>


