<?php global $post ?>

<section id="post">

	<?php while (have_posts()) : the_post(); ?>
		<header>

			<?php # the_post_thumbnail('alcom-hdw') ?>

			<h1>
				<?php if ($allCats = alcom_get_all_categories($post->ID, 'post_category')) : ?>
					<small><?php echo implode(' & ', $allCats) ?></small> 
				<?php endif ?>

				<?php the_title() ?>
			</h1>

			<?php sleek_get_module('partials/post-pubdate') ?>

		</header>

		<article>

			<?php the_content() ?>

		</article>

		<aside>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>
			<?php sleek_get_module('search') ?>
			<?php sleek_get_module('social-media-buttons') ?>

		</aside>
	<?php endwhile ?>

</section>

<nav id="pagination">
	<?php previous_post_link('%link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
