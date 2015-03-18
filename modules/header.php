<header id="header">

	<?php if (is_front_page()) : ?><h1><?php else : ?><p class="logo"><?php endif ?>
		<a href="/">
			Hi! <strong>I'm Andreas</strong> 
			<small>...and I <em>love</em> building websites.</small>
		</a>
	<?php if (is_front_page()) : ?></h1><?php else : ?></p><?php endif ?>

	<?php dynamic_sidebar('header') ?>

</header>
