<a href="<?= get_permalink($plotData['postId']) ?>" class="article blockLink plotHasHoverEffect">

	<div class="imageLinkWrap article__imageWrap blockLinkImageFrame">

		<?php plotLazyload([
			'image' 				=> get_field('featured_image',$plotData['postId']), 
			'imageSize'				=> 'blockLink', 
			'class'					=> 'article__image'
		]); ?>

	</div>


	<div class="meta smallerText"><?= plotTimeElapsed(get_the_date()) ?></div>
	<h5><?= get_the_title($plotData['postId']) ?></h5>

</a>