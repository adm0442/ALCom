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
		<?php sleek_get_module('partials/projects-project') ?>
	<?php endforeach; wp_reset_postdata() ?>

</section>
