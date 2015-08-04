<?php global $post ?>

<?php $theTags = wp_get_post_terms($post->ID, 'portfolio_tags') ?>
<article class="<?php echo isset($class) ? $class : '' ?> <?php foreach ($theTags as $theTag) echo $theTag->name . ' ' ?>">

	<a href="<?php the_permalink() ?>">
		<img src="<?php $img = get_field('desktop_screenshot'); echo $img['sizes']['alcom-medium-tall'] ?>">
	</a>

	<!-- I hate you beeeee, I hate you beeeeee -->
	<div style="background-image: url(<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-medium-tall'] ?>)">

		<h2>
			<a href="<?php the_permalink() ?>">
				<?php the_title() ?>
			</a>
		</h2>

		<?php the_excerpt() ?>

	</div>

</article>
