<?php get_header() ?>

<main>

	<?php sleek_get_module('post') ?>
	<?php comments_template('/modules/comments.php') ?>

</main>

<aside id="aside">

	<?php sleek_get_module('contact') ?>

</aside>

<?php get_footer() ?>
