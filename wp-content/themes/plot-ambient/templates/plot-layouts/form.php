<section class="plotLayoutForm plotLayout <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">

    <div class="maxWidth">

        <div class="plotLayoutForm__box  plotLayoutForm__box--<?= get_sub_field('plotcms_form_box_style') ?> plotLayoutForm__box--<?= get_sub_field('plotcms_form_box_style') ? get_sub_field('plotcms_alignment') : '' ?> <?= get_sub_field('plotcms_form_box_style') == 'alternative' ? 'altFormColourScheme' : '' ?>">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="plotLayoutForm__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <div class="plotLayoutForm__introduction">
                    <?= get_sub_field('introduction') ?>
                </div>

            <?php endif ?>

            <?= do_shortcode('[wpforms id="' . get_sub_field('form') . '"]'); ?>

        </div>

    </div>

</section>