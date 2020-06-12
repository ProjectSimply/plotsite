<section class="testimonial sectionPadding" data-plot-smooth-scroll-element>

    <div class="maxWidth">    

        <p class="testimonial__title growIn"><?= get_field('testimonial_title'); ?></p>

        <p class="testimonial__quote growIn"><?= get_field('testimonial_quote') ?></p>

        <div class="testimonial__imageWrap growIn">
        
            <?php plotLazyload([
                    'image'                 => get_field('testimonial_image'), 
                    'imageSize'             => 'thumbnail',
                    'class'                 => 'testimonial__image'
                ]); ?>

        </div>

        <p class="testimonial__author growIn"><?= get_field('testimonial_author') ?></p>

    </div>

    <div class="testimonial__crossWrap">

        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

</section>