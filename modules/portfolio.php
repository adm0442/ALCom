<?php global $post ?>

<section id="portfolio">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<header>

			<figure>
				<?php /* <img src="<?php 
					$img = get_field('desktop_screenshot');
					echo get_template_directory_uri() . 
							'/inc/simpleimage/si.php?src=' . 
							$img['sizes']['alcom-hdw'] . 
							'&amp;blur=150' 
				?>"> */ ?>
				<img src="<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-hdw'] ?>">
			</figure>

			<?php if ($mobileScreenshot = get_field('mobile_screenshot')) : ?>
				<figure><img src="<?php $img = get_field('mobile_screenshot'); echo $img['url'] ?>"></figure>
			<?php endif ?>

			<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'portfolio_tags')) ?>
			<?php the_excerpt() ?>

			<p><a href="<?php the_field('site_url') ?>" class="button" target="_blank">Visit the site</a></p>

		</header>

		<!-- I hate you div, I hate you beeee -->
		<div>

			<?php the_content() ?>

		</div>
	<?php endwhile; else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_post_link('%link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
