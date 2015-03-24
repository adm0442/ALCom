<?php
	global $tag2ico;
	global $post;

	$taxType = $taxonomy;

	$theTags = get_terms($taxType, array(
		
	));
?>

<?php if ($theTags) : ?>
	<ul class="tags">
		<?php foreach ($theTags as $theTag) : ?>
			<li>
				<a href="<?php echo get_term_link($theTag) ?>" class="icon-<?php echo isset($tag2ico[$theTag->slug]) ? $tag2ico[$theTag->slug] : $theTag->slug ?>">
					<?php echo $theTag->name ?>
				</a>
			</li>
		<?php endforeach ?>
	</ul>
<?php endif ?>
