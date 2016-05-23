<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'projects',
		'numberposts' => 2,
		'orderby' => 'rand'
	));
?>

<section id="random-projects">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<?php get_template_part('modules/partials/projects-project') ?>
	<?php endforeach; wp_reset_postdata() ?>

</section>
