<?php global $post ?>

<section id="project">

	<?php while (have_posts()) : the_post() ?>
		<header>

			<h1 class="icon-<?php the_field('icon') ?>">
				<?php if ($allCats = alcom_get_all_categories($post->ID, 'project_categories')) : ?>
					<small><?php echo implode(' & ', $allCats) ?></small>
				<?php endif ?>

				<?php the_title() ?>
			</h1>

			<p><a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a></p>

		</header>

		<article>

			<?php the_content() ?>

			<p><a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">Download on GitHub</a></p>

		</article>

		<aside class="sticky">

			<?php sleek_get_template_part('modules/partials/tags', array('taxonomy' => 'project_tags')) ?>

			<?php if ($demo = get_field('project_demo')) : ?>
				<h2>Demo</h2>

				<?php echo $demo ?>
			<?php endif ?>

			<?php get_template_part('modules/social-media-buttons') ?>

		</aside>
	<?php endwhile ?>

</section>

<?php get_template_part('modules/post-pagination') ?>
