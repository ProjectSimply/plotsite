<?php if(get_sub_field('block')) : ?>

    <section class="blockLinks section<?= get_sub_field('colour_scheme') ?>">

        <?php if(get_sub_field('heading')) : ?>

            <h3 class="scrollItem plotSectionHeading textCenter"><?= the_sub_field('heading'); ?></h3>

        <?php endif; ?>

        <div class="row">

            <?php while(has_sub_field('block')) : ?>

                <div class="columns medium-6 large-4 end">
                                        
                    <a class="scrollItem blockLink blockLink<?= get_sub_field('colour_scheme') ?>" href="<?php the_sub_field('link_url') ?>">
                        <img style="opacity: <?= get_sub_field('brightness') ? get_sub_field('brightness') : 1; ?>" class="blockLink__image" src="<?= get_sub_field('image')['sizes']['block-link'] ?>" alt="<?php the_sub_field('heading') ?>">
                        <h4 class="blockLink__heading"><?php the_sub_field('heading') ?></h4>
                    </a>                    

                </div>

            <?php endwhile ?>

        </div>

    </section>

<?php endif ?>