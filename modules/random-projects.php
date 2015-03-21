<?php
	global $post;

	$rows = get_posts(array(
		'post_type' => 'projects', 
		'numberposts' => 2, 
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

<section id="random-projects">

	<?php foreach ($rows as $post) : setup_postdata($post) ?>
		<?php $category = wp_get_post_terms($post->ID, 'project_categories') ?>
		<article>

			<h2 class="icon-<?php the_field('icon') ?>">
				<small><a href="<?php echo get_term_link($category[0]) ?>"><?php echo $category[0]->name ?></a></small> 
				<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
			</h2>

			<?php sleek_get_module('partials/tags', array('taxonomy' => 'project_tags')) ?>

			<?php the_excerpt() ?>

			<p>
				<a href="<?php the_permalink() ?>" class="button">Read more</a> 
				<a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a>
			</p>

		</article>
	<?php endforeach; wp_reset_postdata() ?>

</section>
