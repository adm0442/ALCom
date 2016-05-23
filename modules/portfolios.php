<?php global $post ?>

<section id="portfolios">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php get_template_part('modules/partials/portfolios-portfolio') ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php get_template_part('modules/partials/nothing-found') ?>
	<?php endif ?>

</section>
