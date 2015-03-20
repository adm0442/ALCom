<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'post', 
		'numberposts' => 1
	));
?>

<section id="latest-blog">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<h2>
			<a href="<?php the_permalink() ?>">
				<?php the_post_thumbnail('alcom-medium', array('class' => 'framed alignleft')) ?>
				<small>From the Blog</small> 
				<?php the_title() ?>
			</a>
		</h2>

		<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>

		<?php the_excerpt() ?>

		<p><a href="<?php the_permalink() ?>" class="button">Keep reading</a></p>
	<?php endforeach; wp_reset_postdata() ?>

</section>
