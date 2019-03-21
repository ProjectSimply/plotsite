<?php if(get_sub_field('left_column') || get_sub_field('right_column')) : ?>

    <section class="scrollItem twoColumns <?= get_sub_field('identifier') ? 'twoColumns--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>">

        <div class="row">

            <?php if(get_sub_field('left_column')) : ?>
                <div class="columns medium-6">
                    <?php the_sub_field('left_column') ?>
                </div>
            <?php endif ?>

            <?php if(get_sub_field('right_column')) : ?>
                <div class="columns medium-6">
                    <?php the_sub_field('right_column') ?>
                </div>
            <?php endif ?>

        </div>

    </section>

<?php endif ?>
