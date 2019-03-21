<?php if(get_sub_field('slide')) : ?>

    <section class="scrollItem carousel <?= get_sub_field('identifier') ? 'carousel--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>">

        <div class="JS--carousel">

            <?php while(has_sub_field('slide')) : ?>
                
                <div class="carousel__item">

                    <?php if(get_sub_field('slide_type') === 'image') : ?>
                        <img class="carousel__image" src="<?= get_sub_field('image')['sizes']['large'] ?>" alt="<?php the_sub_field('title') ?>">
                    <?php endif ?>


                    <?php if(get_sub_field('slide_type') === 'video') : ?>
                        <div class="carousel__image" style="background-image: url(<?= get_sub_field('fallback_image')['sizes']['large'] ?>);"></div>
            
                        <?php if(get_sub_field('video')) : ?>            
                            <video class="carousel__video" src="<?php the_sub_field('video') ?>" autoplay loop muted playsinline></video>
                        <?php endif ?>
                    <?php endif ?>

                    
                    <div class="carousel__contentWrap">

                        <div class="row">

                            <div class="columns small-11 small-push-1 medium-8 medium-push-2 large-7 large-push-1">

                                <?php if(get_sub_field('title')) : ?>
                                    <h3 class="carousel__heading"><?php the_sub_field('title') ?></h3>
                                <?php endif ?>

                                <?php if(get_sub_field('content')) : ?>
                                    <div class="carousel__text"><?php the_sub_field('content') ?></div>
                                <?php endif ?>

                                <?php if(get_sub_field('link_url')) : ?>
                                    <a  class="carousel__button" href="<?php the_sub_field('link_url') ?>"><?php the_sub_field('link_text') ?></a>
                                <?php endif ?>

                            </div>

                        </div>

                    </div>

                </div>

            <?php endwhile ?>
        
        </div>

    </section>

<?php endif ?>
