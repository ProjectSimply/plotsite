<?php 

//Here's where we can collect any ajax custom actions that we want.
//For example, we might have a collection of post types that we want to return
//as a JSON object rather than just raw HTML to improve on page load times.
//All you need to do is to put data-action on the link you'd like to trigger 
//this function, and then add it to this array:

$ajaxActions = [
	'artistModal' => 'artistModal'

];

//In the above example, your anchor that triggers this would be:
//<a href="#" data-action="exampleAction">My link text</a>

//You can then add in a custom function which must return a json object:
 function artistModal() {

 	$artistId = $_POST['artistId'];

	 $args = [
        'post_type'       => 'artist',
        'p'  			  =>  $artistId
      ];
      $wp_query = new WP_Query($args);
      
      $stages = [];
      
      if($wp_query->have_posts()) :

        while($wp_query->have_posts()) : $wp_query->the_post();

        	$dataToReturnToJS['title'] = get_the_title();
        	$dataToReturnToJS['stage'] = get_field('stage')->post_title;
        	$dataToReturnToJS['time'] = get_field('performance_time');
        	$dataToReturnToJS['biog'] = get_field('biog');

        endwhile;

       endif;


    echo json_encode($dataToReturnToJS);
    exit;
}

//Keep this intact:
foreach($ajaxActions as $action => $function) :

	add_action("wp_ajax_" . $action, $function);
	add_action("wp_ajax_nopriv_" . $action, $function);

endforeach; 