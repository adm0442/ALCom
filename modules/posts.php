<section id="posts">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<article id="post-<?php the_ID() ?>">

				<h2>
					<a href="<?php the_permalink() ?>">
						<?php the_post_thumbnail('alcom-medium') ?>
						<?php the_title() ?>
					</a>
				</h2>

				<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>
				<?php sleek_get_module('partials/post-pubdate') ?>

				<?php the_excerpt() ?>

				<p><a href="<?php the_permalink() ?>" class="button">Keep reading</a></p>

			</article>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<nav id="pagination">
	<?php previous_posts_link(__('Previous page', 'sleek')) ?>
	<?php next_posts_link(__('Next page', 'sleek')) ?>
</nav>
