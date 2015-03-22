<?php
include get_stylesheet_directory() . '/inc/html5form/html5form.php';

# Register our CSS / JS
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
add_action('init', 'alcom_post_thumbnails');

function alcom_post_thumbnails () {
	add_image_size('alcom-small', 200, 200, true);
	add_image_size('alcom-medium', 460, 300, true);
	add_image_size('alcom-hdw', 1920, 800, array('left', 'top'));
#	add_image_size('alcom-hd', 1920, 1080, true);
}

# Sidebars
add_action('init', 'alcom_register_sidebars');

function alcom_register_sidebars () {
	sleek_register_sidebars(array(
		'header'	=> __('Header', 'sleek'), 
		'footer'	=> __('Footer', 'sleek')
	));
}

# Custom post types and taxonomies
add_action('init', 'alcom_register_post_types');

function alcom_register_post_types () {
	$customPostTypes = array('portfolio', 'projects', 'testimonials');
	$allPostTypes = array_merge(array('post', 'page'), $customPostTypes);

	sleek_register_post_types(
		# Post types
		$customPostTypes, 

		# Taxonomies and which post types they belong to
		array(
			# Misc category - used for things like "featured"
			'misc' => $allPostTypes, 

			# Post type specific tags
			'portfolio_tags' => array('portfolio'), 
			'project_categories' => array('projects'), 
			'project_tags' => array('projects')
		)
	);
}

# Show different numbers of posts on different post types (http://wordpress.stackexchange.com/questions/30757/change-posts-per-page-count)
add_action('pre_get_posts', 'alcom_set_posts_per_page');

function alcom_set_posts_per_page ($query) {
	global $wp_the_query;

	if (!is_admin() and $query === $wp_the_query and (is_post_type_archive('portfolio') or is_post_type_archive('projects'))) {
		$query->set('posts_per_page', -1);
	}

	return $query;
}

# Excerpt length
add_filter('excerpt_length', 'alcom_excerpt_length');

function alcom_excerpt_length ($length) {
	return 25;
}

# You can use these if you want
# Cleanup HEAD
add_action('init', 'sleek_cleanup_head');

# Set up for translation (put your mo/po-files in your-theme/languages/ and uncomment this)
# add_action('after_setup_theme', 'sleek_setup_lang');

# Allow empty search
# add_filter('request', 'sleek_allow_empty_search');

# Upgrade Browser warning for old versions of IE etc
# add_action('wp_head', 'sleek_register_browser_update_js');

# Show all post types when browsing author
# add_filter('pre_get_posts', 'sleek_show_all_post_types_for_author');

# Remove HOME from Yoast Breadcrumbs
# add_filter('wpseo_breadcrumb_links', 'sleek_remove_home_from_breadcrumb');

# Exclude AddThis widgets from anything other than posts
# add_filter('addthis_post_exclude', 'sleek_addthis_post_exclude');

# Give pages excerpts
# add_action('init', 'sleek_add_excerpts_to_pages');

# Add some fields to users
add_filter('user_contactmethods', 'alcom_add_user_fields');

function alcom_add_user_fields () {
	$fields['googleplus'] = __('Google+', 'sleek');
	$fields['stackoverflow'] = __('StackOverflow', 'sleek');
	$fields['github'] = __('GitHub', 'sleek');

	return $fields;
}

# Short codes
add_action('init', 'alcom_register_shortcodes');

function alcom_register_shortcodes () {
	# Include - include any module through [include mod=random-testimonial]
	add_shortcode('include', 'sleek_shortcode_include_module');

	# Get Posts short code, see sleek/inc/get-posts.php for details
	# add_shortcode('get-posts', 'sleek_shortcode_get_posts');
}
