<?php
	# Make certain words more likely to appear
	$verbs = array(
		'love', 'love', 'love', 'love', 
		'live for', 'live for', 'live for', 'live for', 
		'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 
		'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 'obsess over', 
		'dream about', 'dream about', 'dream about', 'dream about', 
		'daydream about', 'daydream about', 'daydream about', 'daydream about', 'daydream about', 'daydream about', 
		'daydream about', 'daydream about', 'daydream about', 'daydream about', 'daydream about', 'daydream about', 
		'sometimes feel like cuddling with', 'sometimes feel like cuddling with', 
		'sometimes feel like cuddling with', 'sometimes feel like cuddling with', 
		'get excited thinking about', 'get excited thinking about', 'get excited thinking about', 'get excited thinking about', 
		'get excited thinking about', 'get excited thinking about', 'get excited thinking about', 'get excited thinking about', 
		'completely mess up my day/night cycle because of', 
	);

	$things = array(
		'web development', 'web development', 'web development', 
		'video games', 'video games', 
		'gadgets', 
		'open source', 'open source', 
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
			<small>
				...and I 
				<strong><?php echo $verbs[array_rand($verbs, 1)] ?></strong> 
				<?php echo $things[array_rand($things, 1)] ?>
			</small>
		</a>
	<?php if (is_front_page()) : ?></h1><?php else : ?></p><?php endif ?>

	<?php dynamic_sidebar('header') ?>

</header>
