<?php if(get_sub_field('heading') || get_sub_field('content')) : ?>

    <section class="fluidContent <?= get_sub_field('identifier') ? 'fluidContent--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>"">

        <div class="row">

            <div class="columns medium-9 medium-centered large-8">

                <?php if(get_sub_field('heading')) : ?>
                    <h3 class="scrollItem fluidContent__heading" data-blotter><span class="content__text-inner"><?php the_sub_field('heading') ?></span></h3>
                <?php endif ?>

                <?php if(get_sub_field('content')) : ?>
                    <div class="scrollItem fluidContent__content">
                        <?php the_sub_field('content') ?>
                    </div>
                <?php endif ?>

            </div>

        </div>

    </section>

<?php endif ?>
