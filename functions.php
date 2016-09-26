<?php
/**
 * Excerpt length
 */
add_filter('excerpt_length', function ($length) {
	return 25;
});

/**
 * Show different numbers of posts on different post types (http://wordpress.stackexchange.com/questions/30757/change-posts-per-page-count)
 */
add_action('pre_get_posts', function ($query) {
	global $wp_the_query;

	if (!is_admin() and $query === $wp_the_query and (is_post_type_archive('portfolio') or is_post_type_archive('projects'))) {
		$query->set('posts_per_page', -1);
	}

	if (!is_admin() and $query == $wp_the_query and is_search()) {
		$query->set('post_type', ['post', 'projects', 'portfolio', 'testimonials']);
		$query->set('posts_per_page', 30);
	}

	return $query;
});

/**
 * Return array of linked terms for taxonomy $t and post $id
 */
function alcom_get_all_categories ($id, $t = 'post_tag') {
	$cats = wp_get_post_terms($id, $t);
	$links = [];

	foreach ($cats as $cat) {
		$links[] = '<a href="' . get_term_link($cat) . '">' . $cat->name . '</a>';
	}

	return ($cats and count($cats)) ? $links : false;
}

# Tag name to font awesome icon converter
$tag2ico = [
	'design' => 'apple',
	'responsive' => 'crop',
	'rwd' => 'crop',

	'wordpress' => 'wordpress',
	'wordpress-plugin' => 'wordpress',
	'font-awesome' => 'flag',
	'geo-location' => 'globe',
	'map' => 'location',
	'maps' => 'location',
	'images' => 'picture',
	'image' => 'picture',
	'zoom' => 'zoom-in',
	'animation' => 'video',
	'apache' => 'server',
	'center' => 'align-center',
	'color-picker' => 'eyedropper',
	'forms' => 'list',
	'ubuntu' => 'terminal',
	'grammar' => 'language',
	'howto' => 'help-circled',
	'acf' => 'puzzle',
	'simplefields' => 'puzzle',
	'laravel' => 'cogs',
	'zend' => 'cogs',
	'accessibility' => 'wheelchair',
	'captcha' => 'ok-cricled',
	'icons' => 'heart',
	'validation' => 'check',
	'html5boilerplate' => 'html5',
	'ajax' => 'spinner',
	'captcha' => 'puzzle',

	'php' => 'terminal',
	'php' => 'file-code',
	'css' => 'css3',
	'sass' => 'file-code',
	'sass-mixin' => 'puzzle',
	'html' => 'code',
	'javascript' => 'file-code',
	'java' => 'file-code',
	'jquery' => 'file-code',
	'js' => 'file-code',
];

/**
 * Register thumbnail sizes
 */
add_action('after_setup_theme', function () {
	add_image_size('sleek-small', 160, 160, true);
	add_image_size('sleek-device', 265, 550, ['center', 'top']);
	add_image_size('sleek-medium', 430, 280, true);
	add_image_size('sleek-medium-tall', 460, 600, ['center', 'top']);
	add_image_size('sleek-hd', 1920, 800, ['center', 'top']);
});

/**
 * Register sidebars
 */
add_action('init', function () {
	sleek_register_sidebars([
		'header' => __('Header', 'alcom'),
		'footer' => __('Footer', 'alcom')
	]);
});

/**
 * Register custom post types and taxonomies
 */
$customPostTypes = array(
	'portfolio' => ['description' => 'Some recently launched sites.'],
	'projects' => ['description' => 'Code I think might be useful to others.'],
	'testimonials' => ['description' => 'What others have said.']
);

$allPostTypes = array('post', 'page', 'portfolio', 'projects', 'testimonials');

add_action('init', function () use ($customPostTypes, $allPostTypes) {
	sleek_register_post_types($customPostTypes, 'alcom');

	sleek_register_taxonomies([
		# Misc category - used for things like "featured"
		'misc' => $allPostTypes,

		# Post type specific tags
		'portfolio_tags' => ['portfolio'],
		'project_categories' => ['projects'],
		'project_tags' => ['projects']
	], 'alcom');
});

/* add_action('admin_menu', function () use ($customPostTypes) {
	sleek_register_post_type_meta_data($customPostTypes, 'nexus');
}); */

# Give attachments an archive and make attachment taxonomy archives work
add_action('init', function () {
	sleek_attachment_archives(__('url_attachments', 'sleek_child'), []); # Pass in any potential attachment taxonomies as the last array to enable taxonomy archives
});

/**
 * Register ACF
 * TODO: Move ALCom's ACF from the admin to this
 */
# Hide ACF from admin altogether
# add_filter('acf/settings/show_admin', '__return_false');

# Use these fields (add your fields to acf/my-group.definition.php)
/* add_action('acf/init', function () {
	sleek_register_acf([
		'my_group' => ['movies'] # Second argument can be array of post types or normal ACF location definition
	]);
}); */

/**
 * Allow svg etc uploads
 */
/* add_filter('upload_mimes', function ($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['eps'] = 'application/postscript';

	return $mimes;
}); */

/**
 * Give editors access to theme options
 */
/* $editorRole = get_role('editor');

if (!$editorRole->has_cap('edit_theme_options')) {
	$editorRole->add_cap('edit_theme_options');
}

if (!$editorRole->has_cap('manage_options')) {
	$editorRole->add_cap('manage_options');
} */

/**
 * Register CSS and JS
 */
add_action('init', function () {
	sleek_register_assets([
		'https://fonts.googleapis.com/css?family=Titillium+Web:200,400,600,900',
		'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js' => ['jquery', 'google_maps']
	]);
});

/**
 * Add optional shortcodes provided by SleekWP
 *
 * TODO: Move to individual plugins
 */
add_action('init', function () {
	# Include - include any module through [include mod=random-testimonial] (TODO: Change to get_template_part (but still allow arguments?))
	add_shortcode('include', 'sleek_shortcode_include_module');

	# MarkdownFile
	# add_shortcode('markdown-file', 'sleek_shortcode_markdown_file');

	# Hubspot form
	# add_shortcode('hubspot-form', 'sleek_hubspot_form');
});

/**
 * Add more fields to users
 */
add_filter('user_contactmethods', function () {
	$fields['googleplus'] = __('Google+', 'sleek');
	$fields['stackoverflow'] = __('StackOverflow', 'sleek');
	$fields['github'] = __('GitHub', 'sleek');

	return $fields;
});

/**
 * Set up for translation (put your mo/po-files in your-theme/languages/)
 */
add_action('after_setup_theme', function () {
	load_child_theme_textdomain('alcom', get_stylesheet_directory() . '/languages');
});

/**
 * These are optional actions to improve how WP normally does things
 */
 /**
  * These are optional hacks to improve how WP normally does things
  */
 # Remove WPMU signup stylesheet
 /* add_action('get_header', function () {
 	remove_action('wp_head', 'wpmu_signup_stylesheet');
 }); */

 # Give pages excerpts
 # add_action('init', 'sleek_add_excerpts_to_pages');

 # Disable WP Embed
 add_action('wp_enqueue_scripts', 'sleek_disable_wp_embed');

 # Adds a Browser Update script for older browsers
 # add_action('wp_head', 'sleek_register_browser_update_js');

 # Allow shortcodes in Widgets
 # add_action('init', 'sleek_allow_shortcodes_in_widgets');

 # Cleanup HEAD
 add_action('init', 'sleek_cleanup_head');

 # Move jQuery to bottom of page + include from CDN
 add_action('wp_enqueue_scripts', 'sleek_enqueue_jquery_cdn_in_footer');

 # Allow Markdown in excerpts and ACF
 add_action('init', 'sleek_more_markdown');

 # Add open graph tags to posts (unless Yoast SEO is in use)
 # add_action('wp_head', 'sleek_open_graph_tags');

 # Remove Emoji CSS/JS from head added since WP 4.2.2
 add_action('init', 'sleek_remove_emoji_css_js');

 # Disable CF7 CSS and/or JS
 # add_filter('wpcf7_load_js', '__return_false');
 add_filter('wpcf7_load_css', '__return_false');

 # Add an "active-parent" class to archive pages when browsing their taxonomies
 add_filter('nav_menu_css_class', 'sleek_active_archive_link_on_taxonomies', 10, 2);

 # Allow a 'post_type' => [] argument in get_terms()
 add_filter('terms_clauses', 'sleek_terms_clauses', 10, 3);

 # Add placeholders to comment form
 add_filter('comment_form_defaults', 'sleek_comment_form_placeholders');

 # Disable Ultimate Post Widget CSS
# add_filter('upw_enqueue_styles', '__return_false');

 # Excludes the currently viewed post in UPW
 # add_filter('upw_wp_query_args', 'sleek_exclude_current_post_in_upw');

 # Allow HTML in Widget Titles (with [tags])
 # add_filter('widget_title', 'sleek_html_in_widget_titles');

 # Remove HOME from Yoast Breadcrumbs
 # add_filter('wpseo_breadcrumb_links', 'sleek_remove_home_from_breadcrumb');

 # Show all posts (ignore posts_per_page setting) when browsing custom post types
 # add_filter('pre_get_posts', 'sleek_show_all_cpt_posts');

 # Show all post types when browsing author
 # add_filter('pre_get_posts', 'sleek_show_all_post_types_for_authors');

 # Remove .current_page_parent from Blog-page when viewing another archive
 add_filter('nav_menu_css_class', 'sleek_unset_active_blog_class', 10, 2);
