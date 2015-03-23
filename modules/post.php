<?php global $post ?>

<section id="post">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<?php
			$theCat = wp_get_post_terms($post->ID, 'category');
			$theCat = $theCat ? $theCat[0] : false;
		?>

		<?php if (has_post_thumbnail()) : ?>
			<figure>
				<?php the_post_thumbnail('sleek-hdw') ?>
			</figure>
		<?php endif ?>

		<header>

			<h1>
				<?php if ($theCat) : ?>
					<small>
						<a href="<?php echo get_term_link($theCat) ?>">
							<?php echo $theCat->name ?>
						</a>
					</small>
				<?php endif ?>

				<?php the_title() ?>
			</h1>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>
			<?php sleek_get_module('partials/post-pubdate') ?>

		</header>

		<div>
			<?php the_content() ?>
		</div>
	<?php endwhile; else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_post_link('link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
