<section class="imageGrid">

    <div class="maxWidth">

        <div class="imageGrid__innerWrap">

            <?php while(has_sub_field('image_grid')) : ?>

                <div class="imageGrid__gridItem" data-plot-smooth-scroll-element>

                    <?php if(get_sub_field('grid_item_type') == 'landscape') : ?>

                        <?php plotLazyload([
                                'image' 				=> get_sub_field('landscape_image'), 
                                'imageSize'				=> 'galleryLandscape', 
                                'class'					=> 'JS--lazyLoad imageGrid__image'
                            ]); ?>     

                    <?php else : ?>

                        <div class="imageGrid__portraitWrap ">

                            <?php plotLazyload([
                                'image' 				=> get_sub_field('portrait_image__1'), 
                                'imageSize'				=> 'galleryPortrait', 
                                'class'					=> 'JS--lazyLoad imageGrid__image imageGrid__image--portrait'
                            ]); ?>   
                            
                            <?php plotLazyload([
                                'image' 				=> get_sub_field('portrait_image__2'), 
                                'imageSize'				=> 'galleryPortrait', 
                                'class'					=> 'JS--lazyLoad imageGrid__image imageGrid__image--portrait'
                            ]); ?>   

                        </div>       

                    <?php endif; ?>

                </div>

            <?php endwhile; ?>

        </div>
        
    </div>

    <div class="imageGrid__asset imageGrid__asset--1">

        <?php plotGetTemplatePart('parts/svg-asset--p') ?>

    </div>

    <div class="imageGrid__asset imageGrid__asset--2">

        <?php plotGetTemplatePart('parts/svg-asset--t') ?>

    </div>

</section>