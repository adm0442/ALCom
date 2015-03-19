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

# Thumbnails sizes
# add_action('init', 'sleek_child_post_thumbnails');

function sleek_child_post_thumbnails () {
	add_image_size('sleek-child-small', 120, 120, true);
	add_image_size('sleek-child-hd', 1920, 1080, true);
}

# Sidebars
add_action('init', 'sleek_child_register_sidebars');

function sleek_child_register_sidebars () {
	sleek_register_sidebars(array(
		'aside'		=> __('Aside', 'sleek'), 
		'header'	=> __('Header', 'sleek'), 
		'footer'	=> __('Footer', 'sleek')
	));
}

# Custom post types and taxonomies
# add_action('init', 'sleek_child_register_post_types');

function sleek_child_register_post_types () {
	sleek_register_post_types(
		# Post types
		array('movies', 'directors'), 

		# Taxonomies and which post types they belong to
		array(
			'genres' => array('movies'), 
			'countries' => array('directors', 'movies')
		)
	);
}

# You can use these if you want
# Cleanup HEAD
add_action('init', 'sleek_cleanup_head');

# Set up for translation (put your mo/po-files in your-theme/languages/ and uncomment this)
# add_action('after_setup_theme', 'sleek_setup_lang');

# Allow empty search
add_filter('request', 'sleek_allow_empty_search');

# Upgrade Browser warning for old versions of IE etc
# add_action('wp_head', 'sleek_register_browser_update_js');

# Show all post types when browsing author
add_filter('pre_get_posts', 'sleek_show_all_post_types_for_author');

# Remove HOME from Yoast Breadcrumbs
# add_filter('wpseo_breadcrumb_links', 'sleek_remove_home_from_breadcrumb');

# Exclude AddThis widgets from anything other than posts
# add_filter('addthis_post_exclude', 'sleek_addthis_post_exclude');

# Give pages excerpts
# add_action('init', 'sleek_add_excerpts_to_pages');

# Add some fields to users
# add_filter('user_contactmethods', 'sleek_add_user_fields');

# Short codes & Widgets
# Get Posts short code, see sleek/inc/get-posts.php for details
# add_shortcode('get-posts', 'sleek_shortcode_get_posts');

# Allow HTML in Widget Titles (with [tags])
# add_filter('widget_title', 'sleek_html_in_widget_titles');

# Allow shortcodes in Widgets
# add_action('init', 'sleek_allow_shortcodes_in_widgets');

# Include - include any module through [include mod=random-testimonial]
# add_shortcode('include', 'sleek_shortcode_include_module');
