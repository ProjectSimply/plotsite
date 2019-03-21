<?php if(get_sub_field('block')) : ?>

    <section class="blockLinks <?= get_sub_field('identifier') ? 'blockLinks--' . get_sub_field('identifier') : '' ?>">

        <div class="row">
            <div class="columns">
                <h3>Block Links with template overwrite</h3>
            </div>
        </div>

        <div class="row">

            <?php while(has_sub_field('block')) : ?>

                <div class="columns large-4">

                    <a href="<?php the_sub_field('link_url') ?>">
                        <img src="<?= get_sub_field('image')['sizes']['medium'] ?>" alt="<?php the_sub_field('heading') ?>">
                        <h4><?php the_sub_field('heading') ?></h4>
                    </a>

                </div>

            <?php endwhile ?>

        </div>

    </section>

<?php endif ?>
