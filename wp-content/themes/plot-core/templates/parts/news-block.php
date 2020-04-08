<a href="<?= get_permalink($plotData['postId']) ?>" class="article">

	<?php plotLazyload([
		'image' 				=> get_field('featured_image',$plotData['postId']), 
		'imageSize'				=> 'blockLink', 
		'class'					=> 'article__image'
	]); ?>


	<div class="postMeta"><?= get_the_date(DATE_FORMAT) ?></div>


	<h5><?= get_the_title($plotData['postId']) ?></h5> 

</a>
