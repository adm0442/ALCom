<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'portfolio', 
		'numberposts' => -1
	));
?>

<section id="portfolios">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<article id="post-<?php the_ID() ?>">

			<figure>
				<a href="<?php the_permalink() ?>">
					<img src="<?php $img = get_field('desktop_screenshot'); echo $img['sizes']['alcom-medium-tall'] ?>">
				</a>
			</figure>

			<!-- I hate you beeeee, I hate you beeeeee -->
			<div data-blur="<?php $img = get_field('desktop_screenshot_blurry'); echo $img['sizes']['alcom-medium-tall'] ?>">

				<h2>
					<a href="<?php the_permalink() ?>">
						<?php the_title() ?>
					</a>
				</h2>

				<?php the_excerpt() ?>

			</div>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
