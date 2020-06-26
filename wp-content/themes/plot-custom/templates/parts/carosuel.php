<section class="carouselSection">

    <div class="maxWidth">

        <?php if(get_field('carousel_title')) : ?>

            <h2 class="carouselSection__title growIn"><?= get_field('carousel_title') ?></h2>

        <?php endif; ?>

        <?php if(get_field('carousel_subtext')) : ?>

            <p class="carouselSection__text growIn"><?= get_field('carousel_subtext') ?></p>

        <?php endif; ?>

    </div>

    <div class="JS--carousel JS--carousel--hidden carouselSection__slider">

	    <?php $i = 0; while(has_sub_field('carousel_slider')) : ?>

	    	<div class="carousel__slide JS--carousel__slideWrap <?= $i == 1 ? "is-initial-select" : "" ; ?>">

                <a href="<?= get_sub_field('site_link') ?>" target="_blank" class="carousel__imageWrap">
                    
                    <?php plotLazyload([
                        'image' 				=> get_sub_field('image'), 
                        'imageSize'				=> 'carouselImage', 
                        'smallScreenImageSize'	=> 'carouselImage--smallScreen',
                        'class'					=> 'JS--lazyLoad carousel__image',
                        'forCarousel'			=> true
                    ]); ?>

                </a>

			</div>

		<?php $i++; endwhile; ?>

	</div>

    <?php if(get_field('carousel_add_link')) : ?>

        <div class="carouselSection__buttonWrap button__wrap growIn">
            <a href="<?= get_field('carousel_link') ?>" class="button button--X">
                <span><?=  get_field('carousel_link_text') ?></span>
            </a>
        </div>

    <?php endif; ?>

    <div class="carouselSection__asset carouselSection__asset--1">

        <?php plotGetTemplatePart('parts/svg-asset--p') ?>

    </div>

    <div class="carouselSection__asset carouselSection__asset--2">

        <?php plotGetTemplatePart('parts/svg-asset--t') ?>

    </div>

</section>