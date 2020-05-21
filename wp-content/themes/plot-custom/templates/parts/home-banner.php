<section class="homeBanner sectionPadding">

    <div class="homeBanner__asset homeBanner__asset--1">
        <?php plotGetTemplatePart('parts/svg-asset--l') ?>
    </div>

    <div class="homeBanner__asset homeBanner__asset--2">
        <?php plotGetTemplatePart('parts/svg-asset--o') ?>
    </div>

    <div class="maxWidth">

        <div class="homeBanner__grid">

            <div class="homeBanner__item homeBanner__item--titleWrap">

                <h1 class="homeBanner__title"><?= get_field('home_title') ?></h1>

                <p class="homeBanner__subtitle"><?= get_field('home_banner_subheading') ?></p>

            </div>

            <div class="homeBanner__item homeBanner__item--image">

                <?php plotLazyload([
                        'image' 				=> get_field('home_banner_image'), 
                        'imageSize'				=> 'fiftyFifty', 
                        'class'					=> 'homeBanner__image'
                    ]); ?>

            </div>

            <div class="homeBanner__item homeBanner__item--button">
            
                <a href="<?= get_field('home_banner_link') ?>" class="button homeBanner__button"><?= get_field('home_banner_button_text') ?></a>

            </div>
        
        </div>
    
    </div>

</section>