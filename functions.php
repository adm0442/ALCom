<?php
# Excerpt length
add_filter('excerpt_length', function ($length) {
	return 25;
});

# Show different numbers of posts on different post types (http://wordpress.stackexchange.com/questions/30757/change-posts-per-page-count)
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

# Return array of linked terms for taxonomy $t and post $id
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

# Register CSS and JS
add_action('init', function () {
	sleek_register_assets([
		'https://fonts.googleapis.com/css?family=Titillium+Web:200,400,600,900',
		'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js' => ['jquery', 'google_maps']
	]);
});

# Register thumbnail sizes
add_action('after_setup_theme', function () {
	add_image_size('sleek-small', 160, 160, true);
	add_image_size('sleek-device', 265, 550, ['center', 'top']);
	add_image_size('sleek-medium', 430, 280, true);
	add_image_size('sleek-medium-tall', 460, 600, ['center', 'top']);
	add_image_size('sleek-hd', 1920, 800, ['center', 'top']);
});

# Register sidebars
add_action('init', function () {
	sleek_register_sidebars([
		'header' => __('Header', 'alcom'),
		'footer' => __('Footer', 'alcom')
	]);
});

# Register custom post types and taxonomies
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

# Add meta data (title, description, image) to CPTs
/* add_action('admin_menu', function () use ($postTypes) {
	sleek_register_post_type_meta_data($postTypes, 'nexus');
}); */

# Give attachments an archive and make attachment taxonomy archives work
add_action('init', function () {
	sleek_attachment_archives(__('url_attachments', 'sleek_child'), []); # Pass in any potential attachment taxonomies as the last array to enable taxonomy archives
});

# Register ACF
# Hide ACF from admin altogether (to prevent people from adding ACF)
# add_filter('acf/settings/show_admin', '__return_false');

# Use these fields (add your fields to acf/my-group.definition.php)
/* add_action('acf/init', function () {
	sleek_register_acf([
		'my_group' => ['movies'] # Second argument can be array of post types or normal ACF location definition
	]);
}); */

# Allow svg etc uploads
/* add_filter('upload_mimes', function ($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['eps'] = 'application/postscript';

	return $mimes;
}); */

# Give editors access to theme options
/* $editorRole = get_role('editor');

if (!$editorRole->has_cap('edit_theme_options')) {
	$editorRole->add_cap('edit_theme_options');
}

if (!$editorRole->has_cap('manage_options')) {
	$editorRole->add_cap('manage_options');
} */

# Add more fields to users
add_filter('user_contactmethods', function () {
	$fields['googleplus'] = __('Google+', 'sleek');
	$fields['stackoverflow'] = __('StackOverflow', 'sleek');
	$fields['github'] = __('GitHub', 'sleek');

	return $fields;
});

# Give pages excerpts
/* add_action('init', function () {
	add_post_type_support('page', 'excerpt');
}); */

# Allow shortcodes in Widgets
/* add_action('init', function () {
	add_filter('widget_text', 'do_shortcode');
}); */

# Set up for translation (put your mo/po-files in your-theme/languages/)
add_action('after_setup_theme', function () {
	load_child_theme_textdomain('sleek_child', get_stylesheet_directory() . '/languages');

	# If you want to override parent theme translations, add them to languages/sleek/lang_Code.po
	# load_theme_textdomain('sleek', get_stylesheet_directory() . '/languages/sleek');
});

# Remove a bunch of unwanted CSS/JS added by WP and plug-ins
add_action('init', function () {
	sleek_reduce_requests();
});

# Move jQuery to bottom of page + include from CDN
add_action('wp_enqueue_scripts', 'sleek_enqueue_jquery_cdn_in_footer');

# Add an "active-parent" class to archive pages when browsing their taxonomies
add_filter('nav_menu_css_class', 'sleek_active_archive_link_on_taxonomies', 10, 2);

# Allow a 'post_type' => [] argument in get_terms()
add_filter('terms_clauses', 'sleek_terms_clauses', 10, 3);

# Add placeholders to comment form
add_filter('comment_form_defaults', 'sleek_comment_form_placeholders');

# Remove .current_page_parent from Blog-page when viewing another archive
add_filter('nav_menu_css_class', 'sleek_unset_active_blog_class', 10, 2);

# Allow HTML in Widget Titles (with [tags])
# add_filter('widget_title', 'sleek_html_in_widget_titles');

# Allow Markdown in excerpts and ACF
add_action('init', 'sleek_more_markdown');
