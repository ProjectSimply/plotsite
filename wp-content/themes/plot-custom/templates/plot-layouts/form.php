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
            <p>Or just give us a call on <a href="tel:+01614249000">0161 424 9000</a></p>
        </div>

    </div>

</section>