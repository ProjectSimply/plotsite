<?php $blockLinkData = [
		'image' 		=> plotGetPerformanceImage($plotData['id']),
		'modalData'		=> []

	];

$linkType = get_field('performance_links','option');

if($linkType != 'performance' || !plotHasPerformancePages()) :

	//It's an artist link. so set the URL to be the first artist
	$firstArtistID = get_field('artists',$plotData['id'])[0]['artist']->ID;
    $blockLinkData['url'] = get_permalink($firstArtistID);

	if(get_field('artist_links','option') != 'off') : 

		$blockLinkData['modalData'] = [
			'template-part' 		=> 'parts/artist-biog',
			'class'					=> 'plotModal--artist--' . get_field('artist_links','option') ,
			'data-artist-id'		=> $firstArtistID
		];

	endif;

else :

	$blockLinkData['url'] = get_permalink($plotData['id']);

endif;


?>

<div class="performanceBlock">

	<?php plotGetTemplatePart('parts/block-link',$blockLinkData); ?>
	
	<?php if(get_field('show_performance_times')) : ?>

		<div class="performanceBlock__meta meta"><?= plotPerformanceTime($plotData['id']) ?></div>

	<?php endif; ?>
	
	<h5 class="performanceBlock__title"><?= plotMakePerformanceTitle($plotData['id'],$linkType) ?></h5>

</div>