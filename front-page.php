<?php get_header() ?>

<main>

	<?php include get_stylesheet_directory() . '/modules/featured-portfolio.php' ?>
	<?php include get_stylesheet_directory() . '/modules/random-testimonials.php' ?>
	<?php include get_stylesheet_directory() . '/modules/latest-blog.php' ?>
	<?php include get_stylesheet_directory() . '/modules/random-projects.php' ?>
	<?php dynamic_sidebar('aside') ?>

</main>

<aside id="aside">

	<?php include get_stylesheet_directory() . '/modules/contact.php' ?>

</aside>

<?php get_footer() ?>
