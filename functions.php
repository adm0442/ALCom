<?php
include get_stylesheet_directory() . '/inc/html5form/html5form.php';

add_action('wp_enqueue_scripts', 'alcom_register_css_js');

function alcom_register_css_js () {
	# No need for jQuery 2015 :D
	wp_deregister_script('jquery');

	# Google Maps
#	wp_register_script('google_maps', 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false');
#	wp_enqueue_script('google_maps');

	# Theme JS
	wp_register_script('alcom_foot', get_stylesheet_directory_uri() . '/js/foot.php', array(), filemtime(get_stylesheet_directory() . '/js/foot.js'), true);
	wp_enqueue_script('alcom_foot');

	# Theme CSS
	wp_register_style('alcom', get_stylesheet_directory_uri() . '/css/all.css', array(), filemtime(get_stylesheet_directory() . '/css/all.css'));
	wp_enqueue_style('alcom');
}
