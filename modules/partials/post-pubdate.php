<p class="pubdate">
	<small class="icon-clock">
		<?php printf(__('Posted %s', 'sleek'), '<time datetime="' . get_the_time('Y-m-j') . '">' . get_the_time(get_option('date_format')) . '</time>') ?>
	</small>

	<small class="icon-user">
		<?php printf(__('By %s', 'sleek'), '<a href="' . get_author_posts_url(get_the_author_meta('ID')) . '">' . get_the_author_meta('display_name') . '</a>') ?>
	</small>

	<?php if (has_category()) : ?>
		<small class="icon-archive">
			<?php printf(__('Filed under %s', 'sleek'), get_the_category_list(', ')) ?>
		</small>
	<?php endif ?>
</p>
