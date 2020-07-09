<section class="plotLayoutForm plotLayout">

    <div class="maxWidth">

        <div class="plotLayoutForm__textWrap">

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

        <div class="plotLayoutForm__callUs">
            <p>Look forward to speaking with you</p>
        </div>

    </div>

</section>