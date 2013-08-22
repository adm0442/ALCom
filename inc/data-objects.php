<?php
add_action('init', 'h5b_register_post_types');

function h5b_register_post_types () {
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

/*	register_taxonomy('misc', array('items', 'locations'), array(
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
	)); */
}
