<?php get_template_part('templates/parts/header') ?>

<?php get_template_part('templates/parts/banner') ?>

<div class="siteWrap__container">
    
  <div class="siteWrap__inner">

      <div class="row">
          <div class="columns medium-9 medium-centered large-8">                         
              <div class="defaultContentArea">    
                    <div class="defaultContentArea__articleDate"><?= get_the_date('d-m-Y') ?></div>  
                    <h3 class="defaultContentArea__mainHeading"><?php the_title() ?></h3>                       
                    <?php the_content() ?>
              </div>
          </div>
      </div>

  </div>

</div>

<?php get_template_part('templates/parts/footer') ?>
