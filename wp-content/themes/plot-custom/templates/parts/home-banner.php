<section class="homeBanner sectionPadding" data-plot-smooth-scroll-element>

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


            <div class="homeBanner__mobile3D">
                <div class="menu">
                    <div class="top">
                    
                    </div>
                    <div class="bottom"></div>
                    <div class="menu-back"></div>
                    <div class="glass-reflection"></div>
                </div>
            </div>

            <?php if(get_field('home_banner_link')) : ?>

                <div class="homeBanner__item homeBanner__item--button">
                
                    <a href="<?= get_field('home_banner_link') ?>" class="button homeBanner__button"><?= get_field('home_banner_button_text') ?></a>
    
                </div>

            <?php endif; ?>
        
        </div>
    
    </div>

</section>