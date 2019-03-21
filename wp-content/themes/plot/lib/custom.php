<?php

// Define helper constants
define(IMAGES, get_template_directory_uri() . '/assets/img'); // IMAGE DIRECTORY
define(POST_EXCERPT_LENGTH, 20); //LOWERCASE TODAY AS DAY


//remove wp admin bar
add_filter( 'show_admin_bar', '__return_false' );


//remove emoji support
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 


// Replaces the excerpt "Read More" text by a link
function new_excerpt_more($more) {
       global $post;
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');


// Here you can set how long an excerpt lasts for
function custom_excerpt_length( $length ) {
    return POST_EXCERPT_LENGTH;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );


// Remove wp version from head
function remove_wp_version() {
    return '';
}
add_filter('the_generator', 'remove_wp_version');



// CUSTOM IMAGES SIZES
add_image_size('block-link', 640, 640, true );
add_image_size('banner', 2000, 860, true );
add_image_size('half', 1000, 640, true );


if( function_exists('acf_add_options_page') ) {
	
	$page = acf_add_options_page(array(
		'page_title' 	=> 'Site Status',
		'menu_title' 	=> 'Site Status',
		'menu_slug' 	=> 'site-status',
		'capability' 	=> 'edit_posts',
		'redirect' 		=> false
    ));
    
    $page = acf_add_options_page(array(
		'page_title' 	=> 'Social Media',
		'menu_title' 	=> 'Social Media',
		'menu_slug' 	=> 'social-media',
		'capability' 	=> 'edit_posts',
		'redirect' 		=> false
    ));
    
    $page = acf_add_options_page(array(
		'page_title' 	=> 'Sitewide Features',
		'menu_title' 	=> 'Sitewide Features',
		'menu_slug' 	=> 'sitewide-features',
		'capability' 	=> 'edit_posts',
		'redirect' 		=> false
    ));
    
    $page = acf_add_options_page(array(
		'page_title' 	=> 'Newsletter',
		'menu_title' 	=> 'Newsletter',
		'menu_slug' 	=> 'newsletter',
		'capability' 	=> 'edit_posts',
		'redirect' 		=> false
	));
}



function psBodyClass(){
    
    global $post;

    $bodyClass = get_field('site_status','option') != 'hidden' && is_front_page() ? 'holdingPage' : '';

    $bodyClass .= ' ' . $post->post_name;

    if(is_page('home') || get_field('show_banner') || is_singular('post')) :
      $bodyClass .= ' hasBanner';
    endif;

    if(get_field('colour_scheme')) :
      $bodyClass .= ' ' . strtolower(get_field('colour_scheme'));
    endif;
    
    if(!canShowSite()) :
        $bodyClass .= ' holdingPage';
    endif;
    
    body_class($bodyClass);
}






/**
* 	Return given number of posts
*	@param  $postType  string  the type of post we want
*	@param  $postsPerPAge  int  how many posts to return
*	@return  Object : wordpress query object
**/
function psGetLatestPosts($postType = 'post', $postsPerPage = 2){
        
    $args = [
        'post_type'         => $postType,
        'posts_per_page'    => $postsPerPage
    ];
    
    return new WP_Query($args);
}



function getAllFaqs(){
        
    $args = [
        'post_type'         => 'faq',
        'posts_per_page'    => -1,
        'orderby'           => 'menu_order',
        'order'             => 'ASC'
    ];
    
    return new WP_Query($args);
}



/**
* 	Returns next or/and previous page links for child pages
*	@return  HTML
**/
function getNextAndPrevPageLinks(){

    global $post;

    $html = "";

    $args = [
        "child_of"      => $post->post_parent,
        "parent"        => $post->post_parent,
        "sort_column"   => "menu_order",
        "sort_order"    => "ASC"
    ];
    $pagelist   = get_pages($args);
    $pages      = array();
                
    foreach ($pagelist as $page) :
        $pages[] += $page->ID;
    endforeach;

    $current    = array_search($post->ID, $pages);
    $prevID     = $pages[$current-1];
    $nextID     = $pages[$current+1];
                
    $html .= "<div class='pageNav'>";

    if (!empty($prevID)) :
        
        $html .= "<div class='pageNav__linkWrap pageNav__linkWrap--prev'>";
        $html .= "<a class='page_navLink' href='" . get_permalink($prevID) . "' title='" . get_the_title($prevID) . "'>Previous</a>";
        $html .= "</div>";
    endif;
    
    if (!empty($nextID)) :
        $html .= "<div class='pageNav__linkWrap pageNav__linkWrap--next'>";               
        $html .= "<a class='page_navLink' href='" . get_permalink($nextID) . "' title='" . get_the_title($nextID) . "'>Next</a>";
        $html .= "</div>";
    endif;

    $html .= "</div>";

    return $html;
}


/**
*   Return given number of posts
*   @param  $postType  string  the type of post we want
*   @param  $postsPerPAge  int  how many posts to return
*   @param  $orderby  string  how to order the post, defaults to the WP default of 'date'
*   @param  $order  string  which direction to order posts, defaults to the WP default of 'DESC'
*   @return  Object : wordpress query object
**/
function psGetPosts($postType = 'post', $postsPerPage = 2, $orderby = 'date', $order = 'DESC'){
        
    $args = [
        'post_type'         => $postType,
        'posts_per_page'    => $postsPerPage,
        'orderby'           => $orderby,
        'order'             => $order
    ];

    if( !(current_user_can('editor') || current_user_can('administrator')) ) {
      $args['post_status']  = 'publish';

    }

    if(is_page('location')) :
        
        $args['tax_query'] = array(
                                array (
                                    'taxonomy'  => 'type',
                                    'field'     => 'slug',
                                    'terms'     => 'location'
                                )
                            );
    endif;

    
    return new WP_Query($args);
}


/**
* 	Returns menu based on the passed in $identifier, which is set in ACF in
*   the wp-admin Menus 'Identifer' field
*	@param  $identifier  string  the identifer of the menu we want to return
*	@return  Object : array
**/
function psGetMenu($identifier){
    
    $menus = get_field('menu', 'option');

    foreach($menus as $menu) :
        if($menu['identifier'] === $identifier) :
            return $menu;
        endif;
    endforeach;
}


/**
* Returns true if we are not hiding the site (i.e. splash page or live site) or we're an
* admin or editor user (so we can edit and view pages that are hidden from public)
*	@return  Boolean 
**/
function canShowSite(){
    return get_field('site_status','option') != 'hidden' || current_user_can('editor') || current_user_can('administrator');    
}
