<?php 

$args = [
	'posts_per_page' 	=> NEWS_PER_PAGE,
	'post__not_in'  	=> []
];

//Exclude any featured articles from showing in our typical loops
if(get_field('featured_articles',393)) :

	while(has_sub_fields('featured_articles',393)) :
		$args['post__not_in'][] = get_sub_field('article');
	endwhile;

endif;

//Data that could be passing via AJAX
if(isset($plotData)) :

	if(isset($plotData['page'])) :

		$args['paged'] = $plotData['page'];

	endif;

	if(isset($plotData['category'])) :

		if($plotData['category'] != 0)
			$args['tax_query'] = [
				[ 
		            'taxonomy' => 'category', 
		            'field' => 'id', 
		            'terms' => [$plotData['category']]
		        ]    
		    ]; 

	endif;

endif;

$newsQuery = new WP_Query($args);

?>

<div class="maxPages hidden JS--maxPages" data-max-pages="<?= $newsQuery->max_num_pages ?>"></div>

<?php if($newsQuery->have_posts()) :  ?>

	<?php while($newsQuery->have_posts()) : $newsQuery->the_post(); 

		plotGetTemplatePart('parts/news-block',['postId' => get_sub_field('article')]);

	endwhile; ?>

<?php else : ?>

	<div class="noResults noResults--news">

		<p>No results found</p>

	</div>

<?php endif; ?>
