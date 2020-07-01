<section class="cards">

    <div class="maxWidth">

        <div class="cards__intro">

            <h2 class="cards__sectionHeading"><?= get_field('cards_section_title'); ?></h2>

            <p class="cards__sectionIntro"><?= get_field('cards_section_subtext'); ?></p>

        </div>

        <div class="cards__grid">

            <?php while ( has_sub_field('cards')) : ?>

                <div class="cards__item" data-plot-smooth-scroll-element>

                    <div class="cards__svgWrap">

                        <?= get_sub_field('card_svg'); ?>

                    </div>

                    <div class="cards__textWrap">

                        <h5 class="cards__title growIn"><?= get_sub_field('card_title') ?></h5>

                        <p class="growIn"><?= get_sub_field('card_text'); ?></p>

                    </div>

                </div>

            <?php endwhile; ?>

        </div>

        <?php if(get_field('add_link')) : ?>

            <div class="button__wrap cards_button">
                <a href="<?= get_field('block_section_link') ?>" class="button button--X">
                    <span>
                        <?= get_field('block_section_button_text') ?>
                    </span>
                </a>
            </div>

        <?php endif; ?>

    </div>

</section>