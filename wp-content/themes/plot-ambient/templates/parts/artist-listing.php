<?php 

$args = [
	'post_type' 		=> 'artist',
	'orderby'			=> 'title',
	'order'				=> 'asc',
	'posts_per_page' 	=> ARTISTS_PER_PAGE
];

$day = false;
$filter = false;
$page = false;


if(isset($plotData)) :

	if(isset($plotData['pge']))
		$page = $plotData['pge'];

	if(isset($plotData['artistType']))
		$filter = $plotData['artistType'];

	if(isset($plotData['artistDay']))
		$day = $plotData['artistDay'];


endif;


if(isset($_GET)) :

	if(isset($_GET['pge']))
		$page = 1;

	if(isset($_GET['artist-type']))
		$filter = $_GET['artist-type'];

	if(isset($_GET['artist-day']))
		$day = $_GET['artist-day'];


	if(isset($_GET['pge']))
		$args['posts_per_page'] = (int)$_GET['pge'] * ARTISTS_PER_PAGE;

endif;

if($page)
	$args['paged'] = $page;

if($filter) :

	if($filter != 0)
		$args['tax_query'] = [
			[ 
	            'taxonomy' => 'artist-type', 
	            'field' => 'id', 
	            'terms' => [$filter]
	        ]    
	    ]; 

endif;

if($day) :

	$ids = [];

	if($day != 'all') :

		$performanceArgs = [
			'meta_key' 			=> 'performance_day',
			'meta_value'		=> $day,
			'post_type' 		=> 'performance',
			'posts_per_page'	=> -1
		];



		$performanceQuery = new WP_Query($performanceArgs);

		while($performanceQuery->have_posts()) : $performanceQuery->the_post();

			while(has_sub_field('artists')) :
				if(get_sub_field('artist'))
					$ids[] = get_sub_field('artist');
			endwhile;

		endwhile;

		$args['post__in'] = $ids;


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

		<p><?= get_field('no_results_message',409) ?></p>

	</div>

<?php endif; ?>
