<?php plotGetTemplatePart('parts/banner') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<section class="plotLayout--narrow plotLayout stageInfo">

    <div class="maxWidth">

        <div class="stageInfo__inner">

            <?php if(get_field('information')) : ?>

                <div class="stageInfoPanel altColourScheme">

                    <?php if(get_field('information')) : ?>

                        <div class="informationGrid">

                            <?php while(has_sub_field('information')) : ?>

                                <div class="informationGrid__row">

                                    <div class="informationGrid__item"><?= get_sub_field('info_title') ?></div>
                                    <div class="informationGrid__info"><?= get_sub_field('info') ?></div>

                                </div>

                            <?php endwhile; ?>

                        </div>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

            <div class="plotContentArea stageInfo__content">
                <?= get_field('content') ?>
            </div>

        </div>

    </div>

</section>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 
