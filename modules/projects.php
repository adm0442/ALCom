<?php global $post ?>

<section id="projects">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php get_template_part('modules/partials/projects-project') ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php get_template_part('modules/partials/nothing-found') ?>
	<?php endif ?>

</section>
