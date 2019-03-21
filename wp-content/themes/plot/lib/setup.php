<?php

/**
 * Theme setup
 */

function ps_custom_titles( $title, $sep ) {

    return $title;
}
add_filter( 'wp_title', 'ps_custom_titles', 10, 2 );


function psRedirect() {
  global $wp_rewrite;
  if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->get_search_permastruct()) {
    return;
  }

  $search_base = $wp_rewrite->search_base;
  if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false && strpos($_SERVER['REQUEST_URI'], '&') === false) {
    wp_redirect(get_search_link());
    exit();
  }
}
add_action('template_redirect', 'psRedirect');


function rewrite($url) {
  return str_replace('/?s=', '/search/', $url);
}
add_filter('wpseo_json_ld_search_url', 'psRewrite');

function remove_footer_admin () {
 
    echo 'Built with Plot by <a href="http://www.projectsimply.com" target="_blank">Project Simply</a> | Powered by Wordpress</p>';
}
add_filter('admin_footer_text', 'remove_footer_admin');



function update_user_option_admin_color( $color_scheme ) {
    $color_scheme = 'midnight';

    return $color_scheme;
}
add_filter( 'get_user_option_admin_color', 'update_user_option_admin_color', 5 );


function remove_screen_options_tab()
{
    return false;
}
add_filter('screen_options_show_screen', 'remove_screen_options_tab');


function hide_help() {
    $screen = get_current_screen();
    $screen->remove_help_tabs();
} 
add_action('admin_head', 'hide_help');


// WordPress Custom Font @ Admin
function custom_admin_open_sans_font() {
    echo '<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">' . PHP_EOL;
    echo '<style>body, #wpadminbar *:not([class="ab-icon"]), .wp-core-ui, .media-menu, .media-frame *, .media-modal *{font-family:"Inconsolata",sans-serif !important;}</style>' . PHP_EOL;
}
add_action( 'admin_head', 'custom_admin_open_sans_font' );


// WordPress Custom Font @ Admin Frontend Toolbar
function custom_admin_open_sans_font_frontend_toolbar() {
    if(current_user_can('administrator')) {
        echo '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">' . PHP_EOL;
        echo '<style>#wpadminbar *:not([class="ab-icon"]){font-family:"Open Sans",sans-serif !important;}</style>' . PHP_EOL;
    }
}
add_action( 'wp_head', 'custom_admin_open_sans_font_frontend_toolbar' );


// WordPress Custom Font @ Admin Login
function custom_admin_open_sans_font_login_page() {
    if(stripos($_SERVER["SCRIPT_NAME"], strrchr(wp_login_url(), '/')) !== false) {
        echo '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">' . PHP_EOL;
        echo '<style>body{font-family:"Open Sans",sans-serif !important;}</style>' . PHP_EOL;
  }
}
add_action( 'login_head', 'custom_admin_open_sans_font_login_page' );


function wpb_custom_logo() {
  echo '<style type="text/css">
    #wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
    background-image: url(' . get_bloginfo('stylesheet_directory') . '/assets/img/custom-logo.png) !important;
    background-position: 0 0;
    color:rgba(0, 0, 0, 0);
    }
    #wpadminbar #wp-admin-bar-wp-logo.hover > .ab-item .ab-icon {
    background-position: 0 0;
    }
    </style>';
}
// hook into the administrative header output
add_action('wp_before_admin_bar_render', 'wpb_custom_logo');


function hide_tinypng_dashboard_item() {
  echo '<style type="text/css">
    #tinypng_dashboard_widget {
    display: none;
    }
    </style>';
}
// hook into the administrative header output
add_action('wp_before_admin_bar_render', 'hide_tinypng_dashboard_item');


function overwrite_ultimate_dashboard_menu_css(){
    
    echo '<style type="text/css">
    .toplevel_page_wpforms-overview {
    text-align: left;
    }
    </style>';
}
add_action('wp_before_admin_bar_render', 'overwrite_ultimate_dashboard_menu_css');


function remove_appearance_menu_option(){
    
    echo '<style type="text/css">
    #menu-appearance{
    display: none;
    }
    </style>';
}
add_action('wp_before_admin_bar_render', 'remove_appearance_menu_option');