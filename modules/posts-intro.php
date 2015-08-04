<?php
	$tmp		= sleek_get_posts_intro();
	$title		= $tmp['title'];
	$content	= $tmp['content'];
?>

<?php if ($title or $content) : ?>
	<header id="posts-intro">

		<?php if ($title) : ?>
			<h1><?php echo $title ?></h1>
		<?php endif ?>

		<?php if (is_post_type_archive('portfolio')) : ?>
			<?php sleek_get_module('partials/all-tags', array('taxonomy' => 'portfolio_tags')) ?>
		<?php elseif (is_post_type_archive('projects')) : ?>
			<?php sleek_get_module('partials/all-tags', array('taxonomy' => 'project_tags')) ?>
		<?php elseif (is_home()) : ?>
			<?php sleek_get_module('partials/all-tags', array('taxonomy' => 'post_tag')) ?>
		<?php endif ?>

		<?php if ($content) : ?>
			<?php echo $content ?>
		<?php endif ?>

		<?php if (is_home() or is_search()) : ?>
			<?php sleek_get_module('search') ?>
		<?php endif ?>

	</header>
<?php endif ?>
