<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'testimonials', 
		'numberposts' => 1, 
		'orderby' => 'rand', 
		'tax_query' => array(
			array(
				'taxonomy' => 'misc', 
				'field' => 'slug', 
				'terms' => 'featured'
			)
		)
	));
?>

<section id="random-testimonials">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<?php sleek_get_module('partials/testimonials-testimonial') ?>
	<?php endforeach; wp_reset_postdata() ?>

</section>
