<?php global $post ?>

<section id="portfolio">

	<?php while (have_posts()) : the_post(); ?>
		<header style="background-image: url(<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['sleek-hd'] ?>)">

			<?php if ($mobileScreenshot = get_field('mobile_screenshot')) : ?>
				<img src="<?php $img = get_field('mobile_screenshot'); echo $img['sizes']['sleek-device'] ?>" class="mobile-screenshot">
			<?php endif ?>

			<h1><?php the_title() ?></h1>

			<?php sleek_get_template_part('modules/partials/tags', array('taxonomy' => 'portfolio_tags')) ?>
			<?php the_excerpt() ?>

			<p><a href="<?php the_field('site_url') ?>" class="button" target="_blank">Visit the site</a></p>

		</header>

		<article>

			<?php the_content() ?>

		</article>

		<aside class="sticky--bp-medium">

			<?php get_template_part('modules/social-media-buttons') ?>

		</aside>
	<?php endwhile ?>

</section>

<?php get_template_part('modules/post-pagination') ?>
