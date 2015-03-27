<?php global $post ?>

<section id="portfolio">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<header>

			<img src="<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-hdw'] ?>">

			<?php if ($mobileScreenshot = get_field('mobile_screenshot')) : ?>
				<img src="<?php $img = get_field('mobile_screenshot'); echo $img['sizes']['alcom-hdw'] ?>">
			<?php endif ?>

			<h1><?php the_title() ?></h1>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'portfolio_tags')) ?>
			<?php the_excerpt() ?>

			<p><a href="<?php the_field('site_url') ?>" class="button" target="_blank">Visit the site</a></p>

		</header>

		<article>

			<?php the_content() ?>

		</article>
	<?php endwhile; else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_post_link('%link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
