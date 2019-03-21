<?php

    //Remove Dashboard Metabox Widgets for all users except Admin
    add_action('wp_dashboard_setup', 'stsd_remove_dashboard_widget' );
    function stsd_remove_dashboard_widget() {
        if (!current_user_can('manage_options')){
            global $wp_meta_boxes;
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);		
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
        }
    } 

    
    function my_remove_menu_pages() {

        global $user_ID;

        if (!current_user_can('manage_options')){
            remove_menu_page('tools.php');
            remove_menu_page('profile.php');
        }        
    }
    add_action( 'admin_init', 'my_remove_menu_pages' );


    // Add to existing function.php file
    // Disable support for comments and trackbacks in post types
    function df_disable_comments_post_types_support() {
        $post_types = get_post_types();
        foreach ($post_types as $post_type) {
            if(post_type_supports($post_type, 'comments')) {
                remove_post_type_support($post_type, 'comments');
                remove_post_type_support($post_type, 'trackbacks');
            }
        }
    }
    add_action('admin_init', 'df_disable_comments_post_types_support');


    // Close comments on the front-end
    function df_disable_comments_status() {
        return false;
    }
    add_filter('comments_open', 'df_disable_comments_status', 20, 2);
    add_filter('pings_open', 'df_disable_comments_status', 20, 2);


    // Hide existing comments
    function df_disable_comments_hide_existing_comments($comments) {
        $comments = array();
        return $comments;
    }
    add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);


    // Remove comments page in menu
    function df_disable_comments_admin_menu() {
        remove_menu_page('edit-comments.php');
    }
    add_action('admin_menu', 'df_disable_comments_admin_menu');


    // Redirect any user trying to access comments page
    function df_disable_comments_admin_menu_redirect() {
        global $pagenow;
        if ($pagenow === 'edit-comments.php') {
            wp_redirect(admin_url()); exit;
        }
    }
    add_action('admin_init', 'df_disable_comments_admin_menu_redirect');


    // Remove comments metabox from dashboard
    function df_disable_comments_dashboard() {
        remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
    }
    add_action('admin_init', 'df_disable_comments_dashboard');


    // Remove comments links from admin bar
    function df_disable_comments_admin_bar() {
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    }
    add_action('init', 'df_disable_comments_admin_bar');


    function revcon_change_post_label() {
        global $menu;
        global $submenu;
        $menu[5][0] = 'Articles';
        $submenu['edit.php'][5][0] = 'Articles';
        $submenu['edit.php'][10][0] = 'Add Articles';
        $submenu['edit.php'][16][0] = 'News Tags';
    }

    function revcon_change_post_object() {
        global $wp_post_types;
        $labels = &$wp_post_types['post']->labels;
        $labels->name = 'Articles';
        $labels->singular_name = 'Article';
        $labels->add_new = 'Add Article';
        $labels->add_new_item = 'Add Article';
        $labels->edit_item = 'Edit Article';
        $labels->new_item = 'Articles';
        $labels->view_item = 'View Article';
        $labels->search_items = 'Search Articles';
        $labels->not_found = 'No Articles found';
        $labels->not_found_in_trash = 'No Articles found in Trash';
        $labels->all_items = 'All Articles';
        $labels->menu_name = 'Articles';
        $labels->name_admin_bar = 'Articles';
    }
    
    add_action( 'admin_menu', 'revcon_change_post_label' );
    add_action( 'init', 'revcon_change_post_object' );


// move 'menus' item from appearance to top level menu
function change_menus_position() {

    // Remove old menu
    remove_submenu_page( 'themes.php', 'nav-menus.php' );

    //Add new menu page
     add_menu_page(
       'Menus',
       'Menus',
       'edit_theme_options',
       'nav-menus.php',
       '',
       'dashicons-list-view',
       68
    );
}
add_action('admin_menu', 'change_menus_position');


// ADD MENUS BACK TO THEME
function plot_setup() {

  register_nav_menus();

}
add_action('after_setup_theme', 'plot_setup');



function allow_editors_to_see_menus(){

    $role_object = get_role( 'editor' );
    if (!$role_object->has_cap('edit_theme_options')) : 
        $role_object->add_cap( 'edit_theme_options' );    
    endif;
}
add_action( 'admin_init', 'allow_editors_to_see_menus' );


// HIDING THE WP FORMS BEAR
add_action('admin_head', 'removeWpFormsBear');

function removeWpFormsBear() {

  echo '<style>
    #wpforms-builder .wpforms-toolbar .wpforms-left img {
 	   	display: none !important;
	}
	#wpforms-header img {
		display: none !important;
	}
  </style>';
  
}
