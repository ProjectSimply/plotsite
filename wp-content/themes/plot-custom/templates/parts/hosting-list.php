<section class="hosting">

    <div class="maxWidth">

        <h2><?= get_field('hosting_section_title'); ?></h2>

        <p class="hosting__subText"><?= get_field('hosting_section_subtext') ?></p>


        <div class="hosting__list" data-plot-smooth-scroll-element>

            <?php while ( has_sub_field('hosting_list')) : ?>

                <div class="hosting__listItem growIn">

                    <div class="hosting__icon">

                        <?= get_sub_field('feature_icon'); ?>

                    </div>

                    <div class="hosting__textWrap">

                        <span><?= get_sub_field('feature_text'); ?></span>
                        <h2><?= get_sub_field('feature_bold'); ?></h2>

                    </div>

                </div>

            <?php endwhile; ?>
        
            <p class="hosting__description"><?= get_field('hosting_description_text'); ?></p>


        </div>

    </div>

</section>