<?php global $post ?>

<section id="project">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php $category = wp_get_post_terms($post->ID, 'project_categories') ?>

			<article>

				<h1 class="icon-<?php the_field('icon') ?>">
					<small><a href="<?php echo get_term_link($category[0]) ?>"><?php echo $category[0]->name ?></a></small> 
					<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
				</h1>

				<?php sleek_get_module('partials/tags', array('taxonomy' => 'project_tags')) ?>

				<?php the_content() ?>

				<p><a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a></p>

			</article>

			<?php if ($demo = get_field('project_demo')) : ?>
				<aside>

					<h2>Demo</h2>

					<?php echo $demo ?>

				</aside>
			<?php endif ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_post_link('%link', '%title') ?>
	<?php next_post_link('%link', '%title') ?>
</nav>
