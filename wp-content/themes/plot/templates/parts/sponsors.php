<?php

$args = [
  'posts_per_page' => -1,
   'post_type' => 'partner'
];
$sponsors_query = new WP_Query( $args );

// The Loop
if ( $sponsors_query->have_posts() ) :  ?>

  <section class="partners sectionMint">

    <div class="row">

      <div class="columns">

        <h5 class="scrollItem partners__heading">Our Sponsors</h5>

      </div>

    </div>

    <div class="row partners__logoRow">

      <div class="columns">        

        <ul class="partners__list">


            <?php while($sponsors_query->have_posts()) : $sponsors_query->the_post(); ?>

              <li class= "scrollItem partners__listItem">


                <?php if(get_field('link')) : ?>
                  <a class="partners__link" target="_blank" href="<?php the_field('link') ?>">
                <?php endif ?>

                  <img class="partners__logo" src="<?= get_field('image')['sizes']['medium'] ?>" alt="<?php the_title(); ?>">

                <?php if(get_field('link')) : ?>
                  </a>
                <?php endif ?>

              </li>

            <?php endwhile; ?>

        </ul>

      </div>

    </div>

  </section>  

 <?php endif; ?> 