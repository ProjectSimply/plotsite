<section class="testimonial sectionPadding">

    <div class="maxWidth">    

        <p class="testimonial__title"><?= get_field('testimonial_title'); ?></p>

        <p class="testimonial__quote"><?= get_field('testimonial_quote') ?></p>

        <div class="testimonial__imageWrap">
        
            <?php plotLazyload([
                    'image'                 => get_field('testimonial_image'), 
                    'imageSize'             => 'thumbnail',
                    'class'                 => 'testimonial__image'
                ]); ?>

        </div>

        <p class="testimonial__author"><?= get_field('testimonial_author') ?></p>

    </div>

    <div class="testimonial__crossWrap">

        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

</section>