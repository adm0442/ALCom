<?php global $post ?>

<section id="posts">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php sleek_get_module('partials/posts-post') ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>

<?php
	$prev = get_previous_posts_link(__('Previous page', 'sleek'));
	$next = get_next_posts_link(__('Next page', 'sleek'));
?>

<?php if ($prev or $next) : ?>
	<nav id="pagination">
		<?php echo $prev . $next ?>
	</nav>
<?php endif ?>
