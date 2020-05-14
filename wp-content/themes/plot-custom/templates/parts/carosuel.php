<section class="carouselSection">

    <div class="maxWidth">

        <?php if(get_field('carousel_title')) : ?>

            <h2 class="carouselSection__title"><?= get_field('carousel_title') ?></h2>

        <?php endif; ?>

        <?php if(get_field('carousel_subtext')) : ?>

            <p class="carouselSection__text"><?= get_field('carousel_subtext') ?></p>

        <?php endif; ?>

    </div>

    <div class="JS--carousel JS--carousel--hidden carouselSection__slider">

	    <?php $i = 0; while(has_sub_field('carousel_slider')) : ?>

	    	<div class="carousel__slide JS--carousel__slideWrap <?= $i == 1 ? "is-initial-select" : "" ; ?>">

                <div class="carousel__imageWrap">
                    
                    <?php plotLazyload([
                        'image' 				=> get_sub_field('image'), 
                        'imageSize'				=> 'carouselImage', 
                        'smallScreenImageSize'	=> 'carouselImage--smallScreen',
                        'class'					=> 'JS--lazyLoad carousel__image',
                        'forCarousel'			=> true
                    ]); ?>

                </div>

			</div>

		<?php $i++; endwhile; ?>

	</div>

    <?php if(get_field('carousel_add_link')) : ?>

        <div class="carouselSection__buttonWrap">
            <a href="<?= get_field('carousel_link') ?>" class="button"><?=  get_field('carousel_link_text') ?></a>
        </div>

    <?php endif; ?>

</section>