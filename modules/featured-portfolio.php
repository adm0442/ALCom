<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'portfolio', 
		'numberposts' => -1, 
		'orderby' => 'date', 
		'tax_query' => array(
			array(
				'taxonomy' => 'misc', 
				'field' => 'slug', 
				'terms' => 'featured'
			)
		)
	));
?>

<section id="featured-portfolio">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<article>

			<figure><img src="<?php the_field('desktop_screenshot') ?>"></figure>

			<?php if ($mobileScreenshot = get_field('mobile_screenshot')) : ?>
				<figure><img src="<?php the_field('mobile_screenshot') ?>"></figure>
			<?php endif ?>

			<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'portfolio_tags')) ?>

			<?php the_excerpt() ?>

			<p>
				<a href="<?php the_field('site_url') ?>" class="button">Visit the site</a> or 
				<a href="<?php the_permalink() ?>" class="button secondary">Read more about the project</a>
			</p>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
