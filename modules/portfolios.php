<?php global $post ?>

<section id="portfolios">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post() ?>
			<?php sleek_get_module('partials/portfolios-portfolio') ?>
		<?php endwhile ?>
	<?php else : ?>
		<?php sleek_get_module('partials/nothing-found') ?>
	<?php endif ?>

</section>
