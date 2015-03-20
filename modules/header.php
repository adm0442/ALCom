<?php $verbs = array('love', 'live for', 'obsess over', 'lose sleep over', 'dream about') ?>

<header id="header">

	<?php if (is_front_page()) : ?><h1><?php else : ?><p class="logo"><?php endif ?>
		<a href="/">
			Hi! <strong>I'm Andreas</strong> 
			<small>...and I <em><?php echo $verbs[array_rand($verbs, 1)] ?></em> web development</small>
		</a>
	<?php if (is_front_page()) : ?></h1><?php else : ?></p><?php endif ?>

	<?php dynamic_sidebar('header') ?>

</header>
