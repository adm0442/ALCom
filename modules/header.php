<?php
	# Make certain verbs more likely to appear
	$verbs = array(
		'love', 'love', 'love', 'love', 
		'live for', 'live for', 'live for', 'live for', 
		'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 
		'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 
		'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 
		'sometimes feel like cuddling with'
	);
?>

<header id="header">

	<?php if (is_front_page()) : ?><h1><?php else : ?><p class="logo"><?php endif ?>
		<a href="/">
			Hi! <strong>I'm Andreas</strong> 
			<small>...and I <em><?php echo $verbs[array_rand($verbs, 1)] ?></em> web development</small>
		</a>
	<?php if (is_front_page()) : ?></h1><?php else : ?></p><?php endif ?>

	<?php dynamic_sidebar('header') ?>

</header>
