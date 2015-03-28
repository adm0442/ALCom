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
				<?php if (has_post_thumbnail()) : ?>
					<?php the_post_thumbnail('alcom-medium') ?>
				<?php else : ?>
					<img src="http://lorempixel.com/460/300/abstract">
				<?php endif ?>
				<small>From the Blog</small> 
				<?php the_title() ?>
			</a>
		</h2>

		<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>

		<p class="pubdate"><time><?php echo get_the_time(get_option('date_format')) ?></time></p>

		<?php the_excerpt() ?>

		<p><a href="<?php the_permalink() ?>" class="button">Keep reading</a></p>
	<?php endforeach; wp_reset_postdata() ?>

</section>
