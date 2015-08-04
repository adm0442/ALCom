<?php
	global $post;

	$theCat = wp_get_post_terms($post->ID, 'category');
	$theCat = $theCat ? $theCat[0] : false;
?>
<article<?php echo isset($class) ? ' class="' . $class . '"' : '' ?>>

	<h2>
		<?php if (has_post_thumbnail()) : ?>
			<a href="<?php the_permalink() ?>">
				<?php the_post_thumbnail('alcom-medium') ?>
			</a>
		<?php endif ?>

		<?php if ($theCat) : ?>
			<small>
				<a href="<?php echo get_term_link($theCat) ?>">
					<?php echo $theCat->name ?>
				</a>
			</small>
		<?php endif ?>

		<a href="<?php the_permalink() ?>">
			<?php the_title() ?>
		</a>
	</h2>

	<?php sleek_get_module('partials/tags', array('taxonomy' => 'post_tag')) ?>

	<p class="pubdate"><time><?php echo get_the_time(get_option('date_format')) ?></time></p>

	<?php the_excerpt() ?>

	<p><a href="<?php the_permalink() ?>" class="button">Keep reading</a></p>

</article>
