<?php global $post ?>

<?php $theTags = wp_get_post_terms($post->ID, 'project_tags') ?>
<article class="<?php echo isset($class) ? $class : '' ?> <?php foreach ($theTags as $theTag) echo $theTag->name . ' ' ?>">

	<h2 class="icon-<?php the_field('icon') ?>">
		<?php if ($allCats = alcom_get_all_categories($post->ID, 'project_categories')) : ?>
			<small><?php echo implode(' & ', $allCats) ?></small> 
		<?php endif ?>
		<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
	</h2>

	<?php sleek_get_module('partials/tags', array('taxonomy' => 'project_tags')) ?>

	<?php the_excerpt() ?>

	<p>
		<a href="<?php the_permalink() ?>" class="button">Read more</a> 
		<a href="<?php the_field('github_url') ?>" class="button secondary icon-github" target="_blank">GitHub</a>
	</p>

</article>
