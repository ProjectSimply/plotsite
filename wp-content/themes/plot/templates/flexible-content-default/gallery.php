<?php 

    $images     = get_sub_field('gallery');
    $size       = 'full'; 
    $thumbSize  = 'block-link';
?>

<section class="section<?= get_sub_field('colour_scheme') ?>">

    <?php if(get_sub_field('heading')) : ?>

        <div class="row">
            <div class="columns">
                <h3 class="scrollItem plotSectionHeading textCenter"><?= the_sub_field('heading'); ?></h3>
            </div>
        </div>

    <?php endif; ?>


    <div class="row">

        <?php if( $images ): ?>
            <div class="psImageGallery">
                <?php foreach( $images as $image ): ?>
                    <div class="columns small-6 medium-4 end">
                        <a class="scrollItem blockLink blockLink--gallery" href="<?php echo wp_get_attachment_url( $image['ID'], $size ); ?>">                        
                            <?php echo wp_get_attachment_image( $image['ID'], $thumbSize ); ?>                    
                            <button class="blockLink__expandIcon"><span>+</span></button>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?> 

    </div>

</section>
