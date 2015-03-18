<?php get_header() ?>

<?php include get_stylesheet_directory() . '/modules/featured-portfolio.php' ?>

<main>

	<?php include get_stylesheet_directory() . '/modules/random-testimonials.php' ?>
	<?php include get_stylesheet_directory() . '/modules/latest-blog.php' ?>
	<?php include get_stylesheet_directory() . '/modules/random-projects.php' ?>
	<?php dynamic_sidebar('aside') ?>

</main>

<?php include get_stylesheet_directory() . '/modules/contact.php' ?>

<?php get_footer() ?>
