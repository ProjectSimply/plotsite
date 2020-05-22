<?php 

$now = new DateTime('NOW');

$args = [
	'post_type' 		=> 'performance',
	'orderby'			=> 'meta_value',
	'meta_key'			=> '',
	'order'				=> 'asc',
	'posts_per_page' 	=> PERFORMANCES_PER_PAGE,
	'meta_query'		=> [
		[
			'key' 		=> 'plot_performance_datetime',
			'value' 	=> $now->format('YmdHis'),
			'compare'	=> '>='
		]
	]
];

$settings = [];

//Data that could be passing via AJAX
if(isset($plotData)) :

	if(isset($plotData['exclude'])) :
		$exclude = $plotData['exclude'];
	endif;

	if(isset($plotData['pge'])) :

		$paged = $plotData['pge'];

	endif;

	if(isset($plotData['archive'])) :
		if($plotData['archive'] == true)
			$compare = '<';
	endif;

	if(isset($plotData['artistType'])) :

		$artistType = $plotData['artistType'];

	endif;


endif;


if(isset($plotData['performanceDay'])) :

	$performanceDay = $plotData['performanceDay'];

endif;

if(isset($_GET['performance-day'])) :
	$performanceDay = $_GET['performance-day'];
endif;

if(isset($_GET['artist-type'])) :
	$artistType = $_GET['artist-type'];
endif;

if(isset($_GET['pge'])) :
	$args['posts_per_page'] = $_GET['pge'] * PERFORMANCES_PER_PAGE;
endif;

if(isset($paged)) :

	$args['paged'] = $paged;

endif;

if(isset($artistType)) :

	$artists = [];

	if($artistType != 0 && $artistType != 'all') :

		$artistArgs = [
			'post_type' 		=> 'artist',
			'posts_per_page' 	=> -1,
			'meta_query'		=> [],
			'tax_query' => [
				[ 
		            'taxonomy' 	=> 'artist-type', 
		            'field' 	=> 'id', 
		            'terms' 	=> [$artistType]
		        ] 
		    ] 
		];

		$artistsQuery = new WP_Query($artistArgs);

		while($artistsQuery->have_posts()) : $artistsQuery->the_post();

			$artists[] = get_the_ID();

		endwhile;

	endif;

	$metaQuery = [         
        'relation' => 'OR'   
	];

	foreach($artists as $artist) :
		$metaQuery[] =[
            'key'       => 'artists_$_artist',
            'value'     => $artist,
            'compare'   => 'LIKE'
        ];     
	endforeach;

	$args['meta_query'][] = $metaQuery;
	$exclude = [];

endif;

if(isset($compare)) :
	$args['meta_query'][0]['compare'] = $compare;
endif;

if(isset($performanceDay))  :

	$exclude = [];

	$date = DateTime::createFromFormat('Ymd',$performanceDay);
	if($date) :
		$args['meta_query'][] = plotGeneratePerformancesMetaQuery($performanceDay);
	endif;
endif;


if(isset($exclude)) :
	$args['post__not_in'] = $exclude;
endif;

$performancesQuery = new WP_Query($args);

?>

<div class="maxPages hidden JS--maxPages" data-max-pages="<?= $performancesQuery->max_num_pages ?>"></div>

<?php if($performancesQuery->have_posts()) :  ?>

	<?php while($performancesQuery->have_posts()) : $performancesQuery->the_post();  ?>

		<?= plotGetTemplatePart('parts/performance-listing-item'); ?>

	<?php endwhile; ?>

<?php else : ?>

	<div class="noResults noResults--performances">

		<p>No results found</p>

	</div>

<?php endif; ?>
