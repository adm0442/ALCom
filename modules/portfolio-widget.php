<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'portfolio', 
		'numberposts' => -1
	));
?>

<section id="portfolios">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<article>

			<a href="<?php the_permalink() ?>" target="_blank">
				<img src="<?php $img = get_field('desktop_screenshot'); echo $img['sizes']['alcom-medium-tall'] ?>">
			</a>

			<!-- I hate you beeeee, I hate you beeeeee -->
			<div style="background-image: url(<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-medium-tall'] ?>)">

				<h2>
					<a href="<?php the_permalink() ?>" target="_blank">
						<?php the_title() ?>
					</a>
				</h2>

				<?php the_excerpt() ?>

			</div>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
