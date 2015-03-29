<?php
define('RECAPTCHA_SITE_KEY', '6Ld0FQQTAAAAADAb-WQKUveGUHFP6IAYjuIWthBv');
define('RECAPTCHA_SECRET', '6Ld0FQQTAAAAAM11MaTd5VkDla1reAK5GoOaJXMI');
define('DISQUS_SHORTNAME', 'andreaslagerkvistcom');

include get_template_directory() . '/inc/html5form/html5form.php';

# Register our CSS / JS
add_action('wp_enqueue_scripts', 'alcom_register_css_js');

function alcom_register_css_js () {
	# No need for jQuery 2015 :D
	wp_deregister_script('jquery');

	# Theme CSS
	if (!is_front_page()) {
		wp_register_style('alcom', get_stylesheet_directory_uri() . '/css/all.' . filemtime(get_stylesheet_directory() . '/css/all.css') . '.css', array(), null);
		wp_enqueue_style('alcom');
	}
}

add_action('wp_head', 'alcom_add_css');

function alcom_add_css () {
	if (is_front_page()) {
		echo '<style>' . file_get_contents(get_stylesheet_directory() . '/css/initial-home.css') . '</style>';
	}

	# Add loaded class to body for some styling
	echo "<script>
		document.addEventListener('DOMContentLoaded', function () {
			document.body.classList.add('loaded');
		});
	</script>";
}

# Have to include JS here to get async/defer and correct order of scripts...
add_action('wp_footer', 'alcom_add_recaptcha');

function alcom_add_recaptcha () {
	# If on home page - include rest of CSS
	if (is_front_page()) {
		echo "<script>
			var cb = function() {
				var l = document.createElement('link'); l.rel = 'stylesheet';
				l.href = STYLSHEET_DIRECTORY + '/css/all.css';
				var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
			};

			var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
			if (raf) raf(cb);
			else window.addEventListener('load', cb);
		</script>";
	}

	# Our JS
	if (WP_DEBUG) {
		echo '<script src="' . get_stylesheet_directory_uri() . '/js/foot.php' . '"></script>';
	}
	else {
		echo '<script src="' . get_stylesheet_directory_uri() . '/js/foot.' . filemtime(get_stylesheet_directory() . '/js/foot.js') . '.js' . '"></script>';
	}

	# ReCaptcha
	echo '<script src="https://www.google.com/recaptcha/api.js?onload=RenderCaptchas&amp;render=explicit" async defer></script>';

	# Prettify
	echo '<script src="' . get_template_directory_uri() . '/js/prettify/run_prettify.js' . '"></script>';

	# Google Analytics
	echo "<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-1823084-2', 'auto');
		ga('send', 'pageview');
	</script>";
}

# Thumbnails sizes
add_action('init', 'alcom_post_thumbnails');

function alcom_post_thumbnails () {
	add_image_size('alcom-small', 160, 160, true);
	add_image_size('alcom-device', 265, 550, array('center', 'top'));
	add_image_size('alcom-medium', 430, 280, true);
	add_image_size('alcom-medium-tall', 460, 600, array('center', 'top'));
	add_image_size('alcom-hdw', 1920, 800, array('center', 'top'));
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
	$customPostTypes = array(
		'portfolio' => "Below you'll find a sample of my work.", 
		'projects' => "Here you'll find code I think might be useful to others.", 
		'testimonials' => ''
	);

	$allPostTypes = array_merge(array('post', 'page', 'portfolio', 'projects', 'testimonials'));

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
		), 

		# Translation textdomain (for URLs)
		'alcom'
	);
}

# Exclude certain post types from search}
add_filter('pre_get_posts', 'alcom_exclude_pt');

function alcom_exclude_pt ($query) {
	global $wp_the_query;

	if (!is_admin() and $query === $wp_the_query and is_search()) {
		$query->set('post_type', array('post', 'projects', 'portfolio') );
	}

	return $query;
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

# Allow Markdown in excerpts and advanced custom fields
add_action('init', 'sleek_more_markdown');

# Set up for translation (put your mo/po-files in your-theme/lang/ and uncomment this)
add_action('after_setup_theme', 'alcom_setup_lang');

function alcom_setup_lang () {
	load_theme_textdomain('alcom', get_stylesheet_directory() . '/lang');
}

# Upgrade Browser warning for old versions of IE etc
# add_action('wp_head', 'sleek_register_browser_update_js');

# Show all post types when browsing author
# add_filter('pre_get_posts', 'sleek_show_all_post_types_for_author');

# Remove HOME from Yoast Breadcrumbs
# add_filter('wpseo_breadcrumb_links', 'sleek_remove_home_from_breadcrumb');

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

	# MarkdownFile
	# add_shortcode('markdown-file', 'sleek_shortcode_markdown_file');
}

# Tag name to font awesome icon converter
$tag2ico = array(
	'design' => 'apple', 
	'responsive' => 'crop', 
	'rwd' => 'crop', 

	'wordpress' => 'wordpress', 
	'wordpress-plugin' => 'wordpress', 
	'font-awesome' => 'star', 
	'geo-location' => 'globe', 
	'map' => 'map-marker', 
	'maps' => 'map-marker', 
	'images' => 'picture-o', 
	'image' => 'picture-o', 
	'zoom' => 'search-plus', 
	'animation' => 'film', 
	'apache' => 'server', 
	'center' => 'align-center', 
	'color-picker' => 'eyedropper', 
	'forms' => 'list-alt', 
	'ubuntu' => 'terminal', 
	'grammar' => 'language', 
	'howto' => 'question-circle', 
	'acf' => 'puzzle-piece', 
	'simplefields' => 'puzzle-piece', 
	'laravel' => 'cogs', 
	'zend' => 'cogs', 
	'accessibility' => 'wheelchair', 
	'captcha' => 'check', 
	'icons' => 'heart', 
	'validation' => 'check-square', 

	'php' => 'terminal', 
	'php' => 'file-code-o', 
	'css' => 'css3', 
	'sass' => 'file-code-o', 
	'sass-mixin' => 'puzzle-piece', 
	'html' => 'code', 
	'javascript' => 'file-code-o', 
	'java' => 'file-code-o', 
	'jquery' => 'file-code-o', 
	'js' => 'file-code-o', 
);

function alcom_get_all_categories ($id, $t = 'post_category') {
	$cats = wp_get_post_terms($id, $t);
	$links = array();

	foreach ($cats as $cat) {
		$links[] = '<a href="' . get_term_link($cat) . '">' . $cat->name . '</a>';
	}

	return ($cats and count($cats)) ? $links : false;
}
