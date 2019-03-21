<?php

//A function for quickly adding post types, without having to write loads
//of annoying labels of the same thing, which I find VERILY BORING
//It's not perfect and makes quite a few args assumptions,
//but you can change anything here
function ps_custom_init($post_type_name = '',$slug= '',$overrideArgs = null) {

  if($post_type_name == '' || $slug == '')
    return false;


  $plural = pluralise($post_type_name);

  if($plural == 'Informations')
    $plural = 'Info';

  if($plural == 'Food & Drinks')
    $plural = 'Vendors';

  $labels = array(
    'name'                  => $plural,
    'singular_name'         => $post_type_name,
    'add_new'               => 'Add New',
    'add_new_item'          => 'Add New ' .$post_type_name,
    'edit_item'             => 'Edit '. $post_type_name,
    'new_item'              => 'New '. $post_type_name,
    'all_items'             => 'All '. $plural,
    'view_item'             => 'View '. $post_type_name,
    'search_items'          => 'Search ' . $plural,
    'not_found'             =>  'No '. $plural . ' found',
    'not_found_in_trash'    => 'No '. $plural . ' found in Trash', 
    'parent_item_colon'     => '',
    'menu_name'             => $plural
  );


  $args = array(
    'labels' => $labels,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true,
    'query_var' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => true,
    'menu_position' => null,
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
    ); 

  if($overrideArgs) :

     foreach($overrideArgs as $key => $value) : 
        
        $args[$key] = $value;
        
     endforeach;

  endif;

  register_post_type( $slug, $args );

}

function ps_custom_setup() {
    //Type in the post type label and
    //unique ID in here. <3
    ps_custom_init('FAQ','faq', ['public'=>false]);
    ps_custom_init('Quote','quote', ['public'=>false]);
    ps_custom_init('Artist','artist');
    ps_custom_init('Stage','stage', ['public'=>false]);
    ps_custom_init('Notification','notification', ['public'=>false]);
    ps_custom_init('Partner','partner', ['public'=>false]);
    ps_custom_init('Food & Drink','food-and-drink', ['show_in_nav_menus' => true]);
}
//Uncomment this to put in new post type!
add_action( 'init', 'ps_custom_setup' );