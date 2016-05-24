<?php get_header() ?>

<main>

	<?php get_template_part('modules/featured-portfolio') ?>
	<?php get_template_part('modules/random-testimonial') ?>
	<?php get_template_part('modules/latest-post') ?>
	<?php get_template_part('modules/random-projects') ?>

</main>

<aside id="aside">

	<?php get_template_part('modules/about') ?>
	<?php get_template_part('modules/contact') ?>

</aside>

<?php get_footer() ?>
