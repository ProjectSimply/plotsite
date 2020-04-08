<!-- A reference to use our plot Lazyload helper function, with handy comments.
     All these are optional parameters. 
     If an image is set, it will use this instead of video.
     If no image or video set, it will echo out nothing. 
     Otherwise, it will echo out the HTML required.
 -->

<?php 
	
	plotLazyload([
			'image' 				=> get_field('image'), 	//The large screen image (shown for screen sizes over 640px wide) 
			'imageSize'				=> 'image', //The name of the resized image size generated in WP (from config.php)
			'smallScreenImage' 		=> get_field('small_screen_image'),  //Optional small screen image
			'smallScreenImageSize'	=> 'image', //The name of the resized small screen image size generated in WP (from config.php)
			'video'					=> get_field('video'), //The video field
			'smallScreenVideo'  	=> get_field('small_screen_video'), //The small screen video field
			'class'					=> 'additionalClassNames', //optional classnames. Will always have the JS--lazyload class added
			'id'					=> 'an ID', // Optional HTML ID for this element
			'alt'					=> 'altTag' //Optional alt tag if you want
	]);

?>

<!-- This time without comments for handy copy and paste. -->

<?php 
	
	plotLazyload([
			'image' 				=> get_field('image'), 
			'imageSize'				=> 'image', 
			'smallScreenImage' 		=> get_field('small_screen_image'), 
			'smallScreenImageSize'	=> 'image', 
			'class'					=> 'additionalClassNames',
			'id'					=> 'an ID',
			'alt'					=> 'altTag'
	]);

?>

<?php 
	
	plotLazyload([
			'video'					=> get_field('video'), 
			'smallScreenVideo'  	=> get_field('small_screen_video'), 
			'class'					=> 'additionalClassNames',
			'id'					=> 'an ID',
			'alt'					=> 'altTag'
	]);

?>