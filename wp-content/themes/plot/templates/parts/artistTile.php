<div class="artistTile">
	<div class="parallaxItem" data-parallax-amount="400">
	    <div class="artistTile__imageWrap blockLink">
	        <img class="blockLink__image artistTile__image" src="<?= get_field('featured_image')['sizes']['block-link'] ?>" alt="<?php the_title() ?>">
	        <button class="fdPlus">&#43;</button>
	    </div>
	    <h3 class="artistTile__name" data-blotter><?php the_title() ?></h3>  
	</div>  
</div>


