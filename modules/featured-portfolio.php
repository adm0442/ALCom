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

			<img src="<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-hdw'] ?>">

			<?php if ($mobileScreenshot = get_field('mobile_screenshot')) : ?>
				<img src="<?php $img = get_field('mobile_screenshot'); echo $img['sizes']['alcom-device'] ?>">
			<?php endif ?>

			<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'portfolio_tags')) ?>

			<?php the_excerpt() ?>

			<p>
				<a href="<?php the_field('site_url') ?>" class="button" target="_blank">Visit the site</a> or 
				<a href="<?php the_permalink() ?>" class="button secondary">Read more <span>about the project</span></a>
			</p>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
