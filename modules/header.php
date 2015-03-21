<?php
	# Make certain words more likely to appear
	$verbs = array(
		'love', 'love', 'love', 'love', 
		'live for', 'live for', 'live for', 'live for', 
		'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 
		'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 'lose sleep over', 
		'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 'dream about', 
		'sometimes feel like cuddling with'
	);

	$things = array(
		'web development', 'web development', 'web development', 
		'video games', 
		'gadgets', 
		'open source', 'open source', 'open source', 
		'ubuntu', 'ubuntu', 'ubuntu'
	);

	if (is_front_page()) {
		$verbs = array('build websites');
		$things = array('for people');
	}
?>

<header id="header">

	<?php if (is_front_page()) : ?><h1><?php else : ?><p class="logo"><?php endif ?>
		<a href="<?php echo home_url('/') ?>">
			Hi! <strong>I'm Andreas</strong> 
			<small>...and I <em><?php echo $verbs[array_rand($verbs, 1)] ?></em> <?php echo $things[array_rand($things, 1)] ?></small>
		</a>
	<?php if (is_front_page()) : ?></h1><?php else : ?></p><?php endif ?>

	<?php dynamic_sidebar('header') ?>

</header>
