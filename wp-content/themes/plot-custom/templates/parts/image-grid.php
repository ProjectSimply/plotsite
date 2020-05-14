<section class="imageGrid">

    <div class="maxWidth">

        <div class="imageGrid__innerWrap">

            <?php while(has_sub_field('image_grid')) : ?>

                <?php if(get_sub_field('grid_item_type') == 'landscape') : ?>

                    <?php plotLazyload([
                            'image' 				=> get_sub_field('landscape_image'), 
                            'imageSize'				=> 'galleryLandscape', 
                            'class'					=> 'JS--lazyLoad imageGrid__image'
                        ]); ?>     

                <?php else : ?>

                    <div class="imageGrid__portraitWrap">

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

            <?php endwhile; ?>

        </div>
        
    </div>

</section>