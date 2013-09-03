<?php
add_action('init', 'h5b_register_post_types');

function h5b_register_post_types () {
	$h5b_all_post_types = array('projects', 'jquery_plugins', 'post', 'page');

	register_post_type('projects', array(
		'labels'			=> array(
			'name'			=> __('Projects', 'h5b'),
			'singular_label'=> __('Project', 'h5b')
		), 
		'rewrite'			=> array(
			'with_front' => false, 
			'slug' => __('url_projects', 'h5b')
		), 
		'has_archive'		=> true, 
		'public'			=> true,
		'supports'			=> array(
			'title', 'editor', 'author', 'thumbnail', 'excerpt', 
			'trackbacks', 'custom-fields', 'revisions', 'page-attributes'
		)
	));

	register_post_type('jquery_plugins', array(
		'labels'			=> array(
			'name'			=> __('jQuery Plugins', 'h5b'),
			'singular_label'=> __('jQuery Plugin', 'h5b')
		), 
		'rewrite'			=> array(
			'with_front' => false, 
			'slug' => __('url_jquery_plugins', 'h5b')
		), 
		'has_archive'		=> true, 
		'public'			=> true,
		'supports'			=> array(
			'title', 'editor', 'author', 'thumbnail', 'excerpt', 
			'trackbacks', 'custom-fields', 'revisions', 'page-attributes'
		)
	));

	register_taxonomy('misc', $h5b_all_post_types, array(
		'labels'			=> array(
			'name'			=> __('Misc', 'h5b'), 
			'singular_label'=> __('Misc', 'h5b')
		), 
		'rewrite'			=> array(
			'with_front' => false, 
			'slug' => __('url_misc', 'h5b')
		), 
		'sort'				=> true, 
		'hierarchical'		=> true
	));

	register_taxonomy('techniques', array('projects'), array(
		'labels'			=> array(
			'name'			=> __('Techniques', 'h5b'), 
			'singular_label'=> __('Technique', 'h5b')
		), 
		'rewrite'			=> array(
			'with_front' => false, 
			'slug' => __('url_techniques', 'h5b')
		), 
		'sort'				=> true, 
		'hierarchical'		=> true
	));
}

add_action('init', 'h5b_register_simple_fields');

function h5b_register_simple_fields () {
	$h5b_all_post_types = array('projects', 'jquery_plugins', 'post', 'page');

	# Fields
	# URL
	simple_fields_register_field_group('url_group', array(
		'name'			=> __('URL', 'h5b'), 
		'description'	=> __('A URL associated with this post.', 'h5b'), 
		'repeatable'	=> false, 
		'fields'		=> array(
			array(
				'slug'				=> 'url', 
				'name'				=> __('URL', 'h5b'), 
				'description'		=> __('', 'h5b'), 
				'type'				=> 'text'
			)
		)
	));

	# Connected Posts
	simple_fields_register_field_group('related_posts_group', array(
		'name'			=> __('Related Posts', 'h5b'), 
		'description'	=> __('Posts related to this post.', 'h5b'), 
		'repeatable'	=> true, 
		'fields'		=> array(
			array(
				'slug'				=> 'related_posts', 
				'name'				=> __('Related Post', 'h5b'), 
				'description'		=> __('', 'h5b'), 
				'type'				=> 'post', 
				'type_post_options'	=> array('enabled_post_types' => $h5b_all_post_types)
			)
		)
	));

	# Bullet Points
	simple_fields_register_field_group('bullet_points_group', array(
		'name'			=> __('Bullet Points', 'h5b'), 
		'description'	=> __('...', 'h5b'), 
		'repeatable'	=> true, 
		'fields'		=> array(
			array(
				'slug'				=> 'bullet_points', 
				'name'				=> __('Bullet Point', 'h5b'), 
				'description'		=> __('', 'h5b'), 
				'type'				=> 'text'
			)
		)
	));

	# Images
	simple_fields_register_field_group('images_group', array(
		'name'			=> __('Images', 'h5b'), 
		'description'	=> __('Attach any number of images to this post.', 'h5b'), 
		'repeatable'	=> true, 
		'fields'		=> array(
			array(
				'slug'				=> 'images', 
				'name'				=> __('Image', 'h5b'), 
				'description'		=> __('', 'h5b'), 
				'type'				=> 'file'
			)
		)
	));

	# Connectors
	# Post Connector
	simple_fields_register_post_connector('post_connector', array(
		'name'			=> __('Post Connector', 'h5b'), 
		'post_types'	=> 'post', 
		'field_groups'	=> array(
			array('slug' => 'images_group', 'context' => 'side', 'priority' => 'low'), 
			array('slug' => 'related_posts_group', 'context' => 'side', 'priority' => 'low')
		)
	));

	simple_fields_register_post_type_default('post_connector', 'post');

	# Page Connector
	simple_fields_register_post_connector('page_connector', array(
		'name'			=> __('Page Connector', 'h5b'),  
		'post_types'	=> 'page', 
		'field_groups'	=> array(
			array('slug' => 'images_group', 'context' => 'side', 'priority' => 'low'), 
			array('slug' => 'related_posts_group', 'context' => 'side', 'priority' => 'low')
		)
	));

	simple_fields_register_post_type_default('page_connector', 'page');

	# Project Connector
	simple_fields_register_post_connector('project_connector', array(
		'name'			=> __('Project Connector', 'h5b'),  
		'post_types'	=> 'projects', 
		'field_groups'	=> array(
			array('slug' => 'images_group', 'context' => 'side', 'priority' => 'low'), 
			array('slug' => 'url_group', 'context' => 'side', 'priority' => 'low'), 
			array('slug' => 'bullet_points_group', 'context' => 'normal', 'priority' => 'low'), 
			array('slug' => 'related_posts_group', 'context' => 'side', 'priority' => 'low')
		)
	));

	simple_fields_register_post_type_default('project_connector', 'projects');

	# jQuery Plugin Connector
/*	simple_fields_register_post_connector('jquery_plugin_connector', array(
		'name'			=> __('jQuery Plugins Connector', 'h5b'), 
		'post_types'	=> 'jquery_plugins', 
		'field_groups'	=> array(
			array('slug' => 'images_group', 'context' => 'side', 'priority' => 'low'), 
			array('slug' => 'bullet_points_group', 'context' => 'normal', 'priority' => 'low')
		)
	));

	simple_fields_register_post_type_default('jquery_plugin_connector', 'jquery_plugins'); */
}
