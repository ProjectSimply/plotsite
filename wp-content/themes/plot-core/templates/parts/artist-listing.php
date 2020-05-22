<?php 

$args = [
	'post_type' 		=> 'artist',
	'orderby'			=> 'title',
	'order'				=> 'asc',
	'meta_query'		=> [
		[
			'key' 		=> 'archive',
			'value' 	=> 1,
			'compare'	=> '!='
		]
	]
	'posts_per_page' 	=> ARTISTS_PER_PAGE
];


//Data that could be passing via AJAX
if(isset($plotData)) :

	if(isset($plotData['page'])) :

		$args['paged'] = $plotData['page'];

	endif;

	if(isset($plotData['artistType'])) :

		if($plotData['artistType'] != 0)
			$args['tax_query'] = [
				[ 
		            'taxonomy' 	=> 'artist-type', 
		            'field' 	=> 'id', 
		            'terms' 	=> [$plotData['artistType']]
		        ]    
		    ]; 

	endif;

endif;

$artistsQuery = new WP_Query($args);

?>

<div class="maxPages hidden JS--maxPages" data-max-pages="<?= $artistsQuery->max_num_pages ?>"></div>

<?php if($artistsQuery->have_posts()) :  ?>

	<?php while($artistsQuery->have_posts()) : $artistsQuery->the_post(); 

		plotGetTemplatePart('parts/artist-block');

	endwhile; ?>

<?php else : ?>

	<div class="noResults noResults--artists">

		<p>No results found</p>

	</div>

<?php endif; ?>
