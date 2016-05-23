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
				<?php the_post_thumbnail('alcom-medium') ?>
				<small>From the Blog</small>
				<?php the_title() ?>
			</a>
		</h2>

		<?php sleek_get_template_part('modules/partials/tags', array('taxonomy' => 'post_tag')) ?>

		<p class="pubdate"><time class="icon-clock"><?php echo get_the_time(get_option('date_format')) ?></time></p>

		<?php the_excerpt() ?>

		<p><a href="<?php the_permalink() ?>" class="button">Keep reading</a></p>
	<?php endforeach; wp_reset_postdata() ?>

</section>
