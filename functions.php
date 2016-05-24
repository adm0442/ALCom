<?php
function alcom_get_all_categories ($id, $t = 'post_tag') {
	$cats = wp_get_post_terms($id, $t);
	$links = array();

	foreach ($cats as $cat) {
		$links[] = '<a href="' . get_term_link($cat) . '">' . $cat->name . '</a>';
	}

	return ($cats and count($cats)) ? $links : false;
}

# Tag name to font awesome icon converter
$tag2ico = array(
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
	'forms' => 'th-list',
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
);

# HTML5Form
include get_template_directory() . '/inc/html5form/html5form.php';

/**
 * Some config (TODO: Move to Theme Options)
 */
define('RECAPTCHA_SITE_KEY', '6Ld0FQQTAAAAADAb-WQKUveGUHFP6IAYjuIWthBv');
define('RECAPTCHA_SECRET', '6Ld0FQQTAAAAAM11MaTd5VkDla1reAK5GoOaJXMI');
define('DISQUS_SHORTNAME', 'andreaslagerkvistcom');
define('GOOGLE_ANALYTICS', 'UA-1823084-2');

/**
 * Register thumbnail sizes
 */
add_action('after_setup_theme', 'alcom_post_thumbnails');

function alcom_post_thumbnails () {
	add_image_size('sleek-small', 160, 160, true);
	add_image_size('sleek-device', 265, 550, array('center', 'top'));
	add_image_size('sleek-medium', 430, 280, true);
	add_image_size('sleek-medium-tall', 460, 600, array('center', 'top'));
	add_image_size('sleek-hd', 1920, 800, array('center', 'top'));
}

/**
 * Register sidebars
 */
add_action('init', 'alcom_register_sidebars');

function alcom_register_sidebars () {
	sleek_register_sidebars(array(
		'header'	=> __('Header', 'alcom'),
		'footer'	=> __('Footer', 'alcom')
	));
}

/**
 * Register custom post types and taxonomies
 */
add_action('init', 'alcom_register_post_types_and_taxonomies');

function alcom_register_post_types_and_taxonomies () {
	$customPostTypes = array(
		'portfolio' => "Below you'll find a sample of my work.",
		'projects' => "Here you'll find code I think might be useful to others.",
		'testimonials' => ''
	);

	$allPostTypes = array_merge(array('post', 'page', 'portfolio', 'projects', 'testimonials'));

	sleek_register_post_types($customPostTypes, 'alcom');

	sleek_register_taxonomies(array(
		# Misc category - used for things like "featured"
		'misc' => $allPostTypes,

		# Post type specific tags
		'portfolio_tags' => array('portfolio'),
		'project_categories' => array('projects'),
		'project_tags' => array('projects')
	), 'alcom');
}

/**
 * Register CSS and JS
 *
 * TODO: Move to Sleek? (at least all.css/all.js?)
 */
add_action('wp_enqueue_scripts', 'alcom_register_css_js');

function alcom_register_css_js () {
	# Theme JS
	wp_register_script('alcom', get_stylesheet_directory_uri() . '/dist/all.js?v=' . filemtime(get_stylesheet_directory() . '/dist/all.js'), array('jquery'), null, true);
	wp_enqueue_script('alcom');

	# Google Webfonts
	wp_register_style('alcom_font', 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,300,400,700,800');
	wp_enqueue_style('alcom_font');

	# Theme CSS
	wp_register_style('alcom', get_stylesheet_directory_uri() . '/dist/all.css?v=' . filemtime(get_stylesheet_directory() . '/dist/all.css'), array(), null);
	wp_enqueue_style('alcom');
}

/**
 * Add optional shortcodes provided by SleekWP
 *
 * TODO: Move to individual plugins
 */
add_action('init', 'alcom_register_shortcodes');

function alcom_register_shortcodes () {
	# Include - include any module through [include mod=random-testimonial] (TODO: Change to get_template_part (but still allow arguments?))
	add_shortcode('include', 'sleek_shortcode_include_module');

	# MarkdownFile
	# add_shortcode('markdown-file', 'sleek_shortcode_markdown_file');

	# Hubspot form
	# add_shortcode('hubspot-form', 'sleek_hubspot_form');
}

/**
 * Add more fields to users
 */
add_filter('user_contactmethods', 'alcom_add_user_fields');

function alcom_add_user_fields () {
	$fields['googleplus'] = __('Google+', 'sleek');
	$fields['stackoverflow'] = __('StackOverflow', 'sleek');
	$fields['github'] = __('GitHub', 'sleek');

	return $fields;
}

/**
 * Show different numbers of posts on different post types (http://wordpress.stackexchange.com/questions/30757/change-posts-per-page-count)
 */
add_action('pre_get_posts', 'alcom_set_posts_per_page');

function alcom_set_posts_per_page ($query) {
	global $wp_the_query;

	if (!is_admin() and $query === $wp_the_query and (is_post_type_archive('portfolio') or is_post_type_archive('projects'))) {
		$query->set('posts_per_page', -1);
	}

	if (!is_admin() and $query == $wp_the_query and is_search()) {
		$query->set('post_type', array('post', 'projects', 'portfolio', 'testimonials'));
		$query->set('posts_per_page', 30);
	}

	return $query;
}

/**
 * Excerpt length
 */
add_filter('excerpt_length', 'alcom_excerpt_length');

function alcom_excerpt_length ($length) {
	return 25;
}

/**
 * Set up for translation (put your mo/po-files in your-theme/lang/)
 */
add_action('after_setup_theme', 'alcom_setup_lang');

function alcom_setup_lang () {
	load_child_theme_textdomain('alcom', get_stylesheet_directory() . '/lang');
}

/**
 * These are optional actions to improve how WP normally does things
 */
# Give pages excerpts
# add_action('init', 'sleek_add_excerpts_to_pages');

# Add a favicon.ico if it exists in the theme directory
add_action('wp_head', 'sleek_add_favicon');

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

# Add open graph tags to posts
# add_action('wp_head', 'sleek_open_graph_tags');

# Remove Emoji CSS/JS from head added since WP 4.2.2
add_action('init', 'sleek_remove_emoji_css_js');

/**
 * These are optional filters to improve how WP normally does things
 */
# Disable CF7 CSS
# add_filter('wpcf7_load_js', '__return_false');
# add_filter('wpcf7_load_css', '__return_false');

# Add an "active-parent" class to archive pages when browsing their taxonomies
add_filter('nav_menu_css_class', 'sleek_active_archive_link_on_taxonomies', 10, 2);

# Allow SVG Uploads
# add_filter('upload_mimes', 'sleek_allow_svg_uploads');

# Add placeholders to comment form
add_filter('comment_form_defaults', 'sleek_comment_form_placeholders');

# Disable Ultimate Post Widget CSS
# add_filter('upw_enqueue_styles', 'sleek_disable_upw_styles');

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
