<?php get_header() ?>

<main>

	<?php include get_stylesheet_directory() . '/modules/featured-portfolio.php' ?>
	<?php include get_stylesheet_directory() . '/modules/random-testimonials.php' ?>
	<?php include get_stylesheet_directory() . '/modules/latest-blog.php' ?>
	<?php include get_stylesheet_directory() . '/modules/random-projects.php' ?>

</main>

<aside id="aside">

	<?php dynamic_sidebar('aside') ?>

</aside>

<?php get_footer() ?>
