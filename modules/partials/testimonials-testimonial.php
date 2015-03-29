<?php global $post ?>

<article<?php echo isset($class) ? ' class="' . $class . '"' : '' ?>>

	<figure<?php if (!has_post_thumbnail()) : ?> class="no-img"<?php endif ?>>
		<?php the_post_thumbnail('alcom-small') ?>

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
