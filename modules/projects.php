<?php global $post ?>

<section id="projects">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php sleek_get_module('partials/projects-project') ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>
