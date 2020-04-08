<section class="plotLayout plotSeparatorWrap <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">

    <?php if(get_sub_field('maxWidth')) : ?>

        <div class="maxWidth">

    <?php endif; ?>

        <div class="plotSeparator plotSeparator--<?= get_sub_field('type') ?> plotSeparator--<?= get_sub_field('animation') ?>" style="height: <?= get_sub_field('height') ?>px;background-image:url(<?= get_sub_field('image')['sizes']['large'] ?>);">


        </div>

    <?php if(get_sub_field('maxWidth')) : ?>

        </div>

    <?php endif; ?>

</section>