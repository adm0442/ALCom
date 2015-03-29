<?php global $post ?>

<section id="serp">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php if (get_post_type() == 'projects') : ?>
				<?php sleek_get_module('partials/projects-project', array('class' => 'project')) ?>
			<?php elseif (get_post_type() == 'portfolio') : ?>
				<?php sleek_get_module('partials/portfolios-portfolio', array('class' => 'portfolio')) ?>
			<?php elseif (get_post_type() == 'testimonials') : ?>
				<?php sleek_get_module('partials/testimonials-testimonial', array('class' => 'testimonial')) ?>
			<?php else : ?>
				<?php sleek_get_module('partials/posts-post', array('class' => 'post')) ?>
			<?php endif ?>
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
