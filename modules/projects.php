<?php global $post ?>

<section id="projects">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php $category = wp_get_post_terms($post->ID, 'project_categories') ?>
			<article>

				<h2 class="icon-<?php the_field('icon') ?>">
					<small><a href="<?php echo get_term_link($category[0]) ?>"><?php echo $category[0]->name ?></a></small> 
					<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
				</h2>

				<?php sleek_get_module('partials/tags', array('taxonomy' => 'project_tags')) ?>

				<?php the_excerpt() ?>

				<p>
					<a href="<?php the_permalink() ?>" class="button">Read more</a> 
					<a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a>
				</p>

			</article>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>
