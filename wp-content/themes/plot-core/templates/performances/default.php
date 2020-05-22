<?php plotGetTemplatePart('parts/banner') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<section data-plot-smooth-scroll-frame class="plotLayout--narrow plotLayout performanceInfo">

    <div class="maxWidth">

        <div class="performanceInfo__inner">

            <?php if(get_field('individual_tickets') ||  get_field('additional_information')) : ?>

                <div class="performanceInfoPanel altColourScheme">

                    <?php if(get_field('additional_information')) : ?>

                        <div class="informationGrid">

                            <?php while(has_sub_field('additional_information')) : ?>

                                <div class="informationGrid__row">

                                    <div class="informationGrid__item"><?= get_sub_field('info_title') ?></div>
                                    <div class="informationGrid__info"><?= get_sub_field('info') ?></div>

                                </div>

                            <?php endwhile; ?>

                        </div>

                    <?php endif; ?>

                	<?php if(get_field('individual_tickets')) : ?>

                        <?php if(get_field('prices')) : ?>

                            <div class="performancePricesGrid">

                                <?php while(has_sub_field('prices')) : ?>

                                    <div class="performancePricesGrid__row">

                                        <div class="performancePricesGrid__text"><?= get_sub_field('ticket_title') ?></div>
                                        <div class="performancePricesGrid__price"><?= get_sub_field('price') ?></div>

                                    </div>

                                <?php endwhile; ?>

                            </div>

                        <?php endif; ?>

    				    <a href="<?= get_field('link_url') ?>" class="plotButton"><?= get_field('button_text') ?></a>

    				<?php endif; ?>


                </div>

            <?php endif; ?>

            <div class="plotContentArea performanceInfo__content">
                <?= get_field('content') ?>
            </div>

        </div>

    </div>

</section>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?>
