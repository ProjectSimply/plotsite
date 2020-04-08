<?php

/**
 * Enqueue scripts for our Customizer preview
 *
 * @return void
 */
if ( ! function_exists( 'plot_customizer_preview_scripts' ) ) {
	function plot_customizer_preview_scripts() {
		wp_enqueue_script( 'plot-customizer-preview', trailingslashit( get_stylesheet_directory_uri() ) . 'customizer/js/customizer-preview.js', array( 'customize-preview', 'jquery' ),date('hs') );
	}
}
add_action( 'customize_preview_init', 'plot_customizer_preview_scripts' );


add_action( 'wp_enqueue_scripts', 'plot_customizer_set_up_fonts' );

/**
* Load all our Customizer options
*/
include_once trailingslashit( dirname(__FILE__) ) . 'inc/customizer.php';
include_once trailingslashit( dirname(__FILE__) ) . 'inc/customizer-frontend.php';