<?php global $post ?>

<section id="post">

	<?php while (have_posts()) : the_post(); ?>
		<header>

			<?php # the_post_thumbnail('alcom-hdw') ?>

			<h1>
				<?php if ($allCats = alcom_get_all_categories($post->ID, 'category')) : ?>
					<small><?php echo implode(' & ', $allCats) ?></small>
				<?php endif ?>

				<?php the_title() ?>
			</h1>

			<?php get_template_part('modules/partials/post-pubdate') ?>

		</header>

		<article>

			<?php the_content() ?>

		</article>

		<aside>

			<?php sleek_get_template_part('modules/partials/tags', array('taxonomy' => 'post_tag')) ?>
			<?php get_template_part('modules/search') ?>
			<?php get_template_part('modules/social-media-buttons') ?>

		</aside>
	<?php endwhile ?>

</section>

<?php get_template_part('modules/post-pagination') ?>
