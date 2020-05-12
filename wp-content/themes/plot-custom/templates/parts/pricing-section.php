<section class="pricingSection sectionPadding">

    <div class="maxWidth">

        <?php plotGetTemplatePart('parts/plan-toggle') ?>

        <div class="pricingSection__mainFeatures">

            <div class="pricingSection__list">

                <span class="small">What’s included:</span>

                <?php while ( has_sub_field('main_features_included')) : ?>

                    <div class="pricingSection__item">

                        <h4><?= get_sub_field('feature') ?></h4>

                    </div>

                <?php endwhile; ?>

            </div>

            <div class="pricingSection__buttonWrap">
                <a href="<?= get_field('pricing_button_link') ?>" class="button"><?=  get_field('pricing_button_text') ?></a>
            </div>

            <div class="textOnlyBanner__asset textOnlyBanner__asset--1">

                <?php plotGetTemplatePart('parts/cross-asset') ?>

            </div>

            <div class="textOnlyBanner__asset textOnlyBanner__asset--2">

                <?php plotGetTemplatePart('parts/cross-asset') ?>

            </div>

        </div>

        <div class="pricingSection__fullFeatures">

            <input id="listToggle" class="pricingSection__checkbox" type="checkbox" name="">
            <label for="listToggle" class="small JS--toggleList pricingSection__toggleList">View full feature set</label>
            
            <ul class="pricingSection__fullList">

                <?php while ( has_sub_field('full_features_list')) : ?>

                    <li class="pricingSection__item">

                        <h5><?= get_sub_field('feature') ?></h5>

                    </li>

                <?php endwhile; ?>

            </ul>

        </div>

    </div>

</section>