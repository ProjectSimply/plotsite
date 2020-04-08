<section class="fluidContent plotLayout">

    <div class="maxWidth">

        <div class="fluidContent__inner">

            <?php if(get_sub_field('heading')) : ?>
                <h2 class="fluidContent__heading"><?php the_sub_field('heading') ?></h2>
            <?php endif ?>

            <?php if(get_sub_field('content')) : ?>
                <div class="fluidContent__content">
                    <?= get_sub_field('content') ?>
                </div>
            <?php endif ?>

        </div>

    </div>

</section>