<?php

//This funciton creates new taxonomies based on what's passed
//to it.
function ps_custom_taxonomies_init($taxonomy_name='',$post_type='post') {
  // Add new "Locations" taxonomy to Posts
  register_taxonomy(strtolower($taxonomy_name), $post_type, array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => _x( pluralise($taxonomy_name), 'taxonomy general name' ),
      'singular_name' => _x( $taxonomy_name, 'taxonomy singular name' ),
      'search_items' =>  __( 'Search ' . pluralise($taxonomy_name) ),
      'all_items' => __( 'All ' . pluralise($taxonomy_name) ),
      'parent_item' => __( 'Parent ' .$taxonomy_name ),
      'parent_item_colon' => __( 'Parent ' . $taxonomy_name . ':' ),
      'edit_item' => __( 'Edit ' . $taxonomy_name ),
      'update_item' => __( 'Update ' . $taxonomy_name ),
      'add_new_item' => __( 'Add New ' . $taxonomy_name ),
      'new_item_name' => __( 'New ' . $taxonomy_name . ' Name' ),
      'menu_name' => __( pluralise($taxonomy_name) ),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => strtolower($taxonomy_name), // This controls the base slug that will display before each term
      'with_front' => false, // Don't display the category base before "/locations/"
      'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
    ),
  ));
}

//Pass through the SINGULAR name for the taxonomy, along with a post type.
function ps_add_taxonomies() {
    ps_custom_taxonomies_init('FAQ Category','faq');
    ps_custom_taxonomies_init('Genre','artist');
}

//Uncomment this to put in new taxonomy
add_action( 'init', 'ps_add_taxonomies', 0 );

