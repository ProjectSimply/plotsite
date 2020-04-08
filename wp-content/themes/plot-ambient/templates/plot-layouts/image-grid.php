<?php $randomID = substr(uniqid('', true), -5); //capture a random ID for differentiating gallery and modal items ?>

<section class="plotLayout imageGrid <?= get_sub_field('plotcms_color_scheme') == 'alternative' ? 'altColourScheme' : "" ?>">

    <div class="maxWidth">

        <div class="imageGrid__textWrap">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="imageGrid__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <div class="imageGrid__content">
                    <?= get_sub_field('introduction') ?>
                </div>

            <?php endif ?>

        </div>

        <div class="imageGrid__layout imageGrid__layout--<?= get_sub_field('grid_layout') ?>">

            <?php $i = 1; while(has_sub_field('images')) :  ?>

                <div data-animate-on-scroll data-animation-amount="<?= $i*0.2 ?>" class="imageGrid__gridItem imageGrid__gridItem--<?= $i; ?>">

                    <a class="JS--plotModalButton plotHasHoverEffect" href="#" 
                        data-plot-modal
                        data-plot-modal-class="plotModal--gallery" 
                        data-plot-modal-contents="<?= $randomID ?>--<?= $i ?>" 
                        data-plot-modal-group="<?= $randomID ?>">

                        <?php plotLazyload([
                            'image' 				=> get_sub_field('image'), 
                            'imageSize'				=> 'imageGrid', 
                            'class'					=> 'imageGrid__image'
                        ]); ?>

                    </a>

                    <div class="JS--plotModalContents plotModalContents" data-plot-modal-contents="<?= $randomID ?>--<?= $i ?>">

                        <?php if(!get_sub_field('pop_open_a_video')) : ?>

                                <?php plotLazyload([
                                    'image' 				=> get_sub_field('image'), 
                                    'imageSize'				=> 'large', 
                                    'class'					=> 'imageGrid__image'
                                ]); ?>
                            
                        <?php else : ?>                         
                            

                            <video
                                class="modalVideo"
                                controls
                                preload="auto">
                              <source src="<?= get_sub_field('pop_open_a_video') ?>" type="video/mp4"></source>
                              
                            </video>

                        <?php endif; ?>

                    </div>

                </div>


            <?php $i++; endwhile;  ?>

        </div>

    </div>

</section>


