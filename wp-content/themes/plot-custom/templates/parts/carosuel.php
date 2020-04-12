<section class="carouselSection">

    <div class="maxWidth">

        <h2 class="carouselSection__title"><?= get_field('carousel_title') ?></h2>

        <p class="carouselSection__text"><?= get_field('carousel_subtext') ?></p>

    </div>

    <div class="JS--carousel JS--carousel--hidden carouselSection__slider">

	    <?php $i = 0; while(has_sub_field('carousel_slide')) : ?>

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

    <div class="carouselSection__buttonWrap">
        <a href="<?= get_field('carousel_button_link') ?>" class="button"><?=  get_field('carousel_button_text') ?></a>
    </div>

</section>