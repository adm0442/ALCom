<?php
	$tag2ico = array(
		'design' => 'apple', 
		'development' => 'terminal', 
		'wordpress' => 'wordpress', 
		'css' => 'css3', 
		'css3' => 'css3', 
		'sass' => 'css3'
	);

	global $post;

	$taxType = 'post_tag';

	# TODO: This file should handle all types of taxonomies not just post-tags
	$theTags = wp_get_post_terms($post->ID, $taxType, array(
		
	));
?>

<ul class="tags">
	<?php foreach ($theTags as $theTag) : ?>
		<li>
			<a href="<?php echo get_term_link($theTag) ?>" class="icon-<?php echo isset($tag2ico[$theTag->slug]) ? $tag2ico[$theTag->slug] : 'tag' ?>">
				<?php echo $theTag->name ?>
			</a>
		<li>
	<?php endforeach ?>
</ul>

