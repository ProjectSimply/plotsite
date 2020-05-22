<section class="plotLayoutForm plotLayout">

    <div class="maxWidth">

        <div class="plotLayoutForm__textWrap">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="plotLayoutForm__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction') && get_sub_field('include_an_introduction')) : ?>

                <?= get_sub_field('introduction') ?>

            <?php endif ?>

            <?= do_shortcode('[wpforms id="' . get_sub_field('form') . '"]'); ?>

            <?php if(get_sub_field('add_small_print') && get_sub_field('small_print')) : ?>

                <?= get_sub_field('small_print') ?>

            <?php endif ?>

        </div>

    </div>

</section>