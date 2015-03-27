<?php global $post ?>

<section id="project">

	<?php if (have_posts()) : while (have_posts()) : the_post() ?>
		<?php $category = wp_get_post_terms($post->ID, 'project_categories') ?>

		<header>

			<h1 class="icon-<?php the_field('icon') ?>">
				<small><a href="<?php echo get_term_link($category[0]) ?>"><?php echo $category[0]->name ?></a></small> 
				<?php the_title() ?>
			</h1>

			<p><a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a></p>

		</header>

		<article>

			<?php the_content() ?>

		</article>

		<aside>

			<?php if ($demo = get_field('project_demo')) : ?>
				<h2>Demo</h2>

				<?php echo $demo ?>
			<?php endif ?>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'project_tags')) ?>
			<?php # sleek_get_module('social-media-buttons') ?>

		</aside>
	<?php endwhile; else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_post_link('%link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
