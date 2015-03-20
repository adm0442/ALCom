<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'testimonials', 
		'numberposts' => 1, 
		'orderby' => 'rand', 
		'tax_query' => array(
			array(
				'taxonomy' => 'misc', 
				'field' => 'slug', 
				'terms' => 'featured'
			)
		)
	));
?>

<section id="random-testimonials">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<article>

			<figure>
				<?php the_post_thumbnail('sleek-small') ?>

				<figcaption>
					<cite><?php the_title() ?></cite> 
					<small>
						<?php
							# WP you're such a pain sometimes... (yes I'm aware of get_the_excerpt but it's not exactly the same as the_excerpt)
							ob_start();
							the_excerpt();
							$output = ob_get_contents();
							ob_end_clean();

							echo strip_tags($output, '<br><br/>');
						?>
					</small>
				</figcaption>
			</figure>

			<blockquote><?php the_content() ?></blockquote>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
