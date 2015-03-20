<?php get_header() ?>

<main>

	<?php sleek_include_module('featured-portfolio') ?>
	<?php sleek_include_module('random-testimonials') ?>
	<?php sleek_include_module('latest-blog') ?>
	<?php sleek_include_module('random-projects') ?>

</main>

<aside id="aside">

	<?php dynamic_sidebar('aside') ?>

</aside>

<?php get_footer() ?>
