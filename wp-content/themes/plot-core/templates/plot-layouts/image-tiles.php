<?php $randomID = substr(uniqid('', true), -5); //capture a random ID for differentiating gallery and modal items ?>

<section class="plotLayout imageTiles">

    <div class="maxWidth">

        <div class="imageTiles__textWrap">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="imageTiles__heading"><?php the_sub_field('heading') ?></h2>

            <?php endif ?>

            <?php if(get_sub_field('introduction')) : ?>

                <div class="imageTiles__content">
                    <?= get_sub_field('introduction') ?>
                </div>

            <?php endif ?>

        </div>

        <div class="imageTiles__layout">

            <?php $i = 1; while(has_sub_field('image-rows')) :  ?>

                <?php for($column = 1; $column <= 2; $column++) : ?>

                    <div class="imageTiles__gridItem imageTiles__gridItem--<?= $i; ?>">

                        <a class="JS--plotModalButton" href="#" data-plot-modal data-plot-modal-contents="<?= $randomID ?>--<?= $i . $column ?>" data-plot-modal-group="<?= $randomID ?>">

                            <?php plotLazyload([
                                'image' 				=> get_sub_field('image-' . $column), 
                                'imageSize'				=> 'fiftyFifty', 
                                'class'					=> 'imageTiles__image'
                            ]); ?>

                        </a>

                        <div class="JS--plotModalContents plotModalContents" data-plot-modal-contents="<?= $randomID ?>--<?= $i . $column ?>">

                            <?php if(!get_sub_field('pop_open_a_video-' . $column)) : ?>

                                    <?php plotLazyload([
                                        'image' 				=> get_sub_field('image-' . $column), 
                                        'imageSize'				=> 'large', 
                                        'class'					=> 'imageTiles__image'
                                    ]); ?>
                                
                            <?php else : ?>                         
                                

                                <video
                                    class="modalVideo"
                                    controls
                                    preload="auto">
                                  <source src="<?= get_sub_field('pop_open_a_video-' . $column) ?>" type="video/mp4"></source>
                                  
                                </video>

                            <?php endif; ?>

                        </div>

                    </div>

                <?php endfor; ?>


            <?php $i++; endwhile;  ?>

        </div>

    </div>

</section>


