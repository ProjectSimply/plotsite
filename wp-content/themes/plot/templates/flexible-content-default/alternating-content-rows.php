<?php if(get_sub_field('rows')) : ?>

    <section class="altContentRow section<?= get_sub_field('colour_scheme') ?>">

        <?php if(get_sub_field('heading')) : ?>

            <h2 class="scrollItem plotSectionHeading textCenter"><?= the_sub_field('heading'); ?></h2>

        <?php endif; ?>

        <?php while(has_sub_field('rows')) : ?>

            <?php $layout = get_sub_field('layout_option') ?>

            <div class="altContentRow__row scrollItem">
            
                <div class="row">

                    <div class="columns medium-6 altContentRow__imageCol <?= $layout === 'right' ? 'altContentRow__imageCol--right' : '' ?>">

                        <div class="altContentRow__imageWrap parallaxItem" data-parallax-amount="100">

                            <?php if(get_sub_field('image')) : ?>
                                <img src="<?= get_sub_field('image')['sizes']['half'] ?>" alt="<?php the_sub_field('heading') ?>">
                            <?php endif ?>

                            <svg class="altContentRow__svg altContentRow__svg--1" viewBox="0 0 74 74" fill="none">
                                <path class="altContentRow__svgPath" d="M74 17.1775L56.8225 0L37 19.8225L17.1775 0L0 17.1775L19.8225 37L0 56.8225L17.1775 74L37 54.1775L56.8225 74L74 56.8225L54.1775 37L74 17.1775Z" />
                            </svg>

                        </div>

                    </div>

                    <div class="columns medium-6">

                        <div class="altContentRow__textWrap parallaxItem" data-parallax-amount="220">

                            <svg class="altContentRow__svg altContentRow__svg--2" viewBox="0 0 74 74" fill="none">
                                <path class="altContentRow__svgPath" d="M74 17.1775L56.8225 0L37 19.8225L17.1775 0L0 17.1775L19.8225 37L0 56.8225L17.1775 74L37 54.1775L56.8225 74L74 56.8225L54.1775 37L74 17.1775Z" />
                            </svg>

                            <svg class="altContentRow__svg altContentRow__svg--3" viewBox="0 0 74 74" fill="none">
                                <path class="altContentRow__svgPath" d="M74 17.1775L56.8225 0L37 19.8225L17.1775 0L0 17.1775L19.8225 37L0 56.8225L17.1775 74L37 54.1775L56.8225 74L74 56.8225L54.1775 37L74 17.1775Z" />
                            </svg>

                            <?php if(get_sub_field('heading')) : ?>
                                <h3 data-blotter class="altContentRow__heading"><span class="content__text-inner"><?php the_sub_field('heading') ?></span></h3>
                            <?php endif ?>

                            <?php if(get_sub_field('content')) : ?>
                                <div class="altContentRow__copy"><?php the_sub_field('content') ?></div>
                            <?php endif ?>

                            <?php if(get_sub_field('add_link_button')) : ?>                
                                <a class="altContentRow__button plotBorderButton plotBorderButton--blue" href="<?php the_sub_field('link_url') ?>"><?php the_sub_field('button_text') ?></a>
                            <?php endif ?>                            

                        </div>

                    </div>

                </div>

            </div>

        <?php endwhile ?>

        <div class="row">
            <div class="columns">
                <a href="<?php the_sub_field('button_link') ?>"><?php the_sub_field('button_text') ?></a>
            </div>
        </div>

    </section>

<?php endif ?>
