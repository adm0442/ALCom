<?php
include get_stylesheet_directory() . '/inc/html5form/html5form.php';

add_action('wp_enqueue_scripts', 'h5b_child_register_css_js');

function h5b_child_register_css_js () {
	# No need for jQuery 2015 :D
	wp_deregister_script('jquery');

	# Google Maps
#	wp_register_script('google_maps', 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false');
#	wp_enqueue_script('google_maps');

	# Theme CSS
	wp_register_style('h5b_child', get_stylesheet_directory_uri() . '/css/all.css', array(), filemtime(TEMPLATEPATH . '/css/all.css'));
	wp_enqueue_style('h5b_child');
}
