<?php $users = get_users(array('include' => array(1))) ?>

<section id="about">

	<?php foreach ($users as $usr) : ?>
		<img src="<?php echo sleek_get_avatar_url(get_avatar($usr->ID, 300)) ?>" class="framed alignleft" width="300" height="300">

		<h2>About me</h2>

		<?php echo wpautop(get_user_meta($usr->ID, 'description', true)) ?>

		<h3>Find me elsewhere</h3>

		<ul class="tags">
			<?php $gh = get_user_meta($usr->ID, 'github', true) ?>
			<?php if ($gh) : ?>
				<li><a href="<?php echo $gh ?>" class="icon-github">GitHub</a></li>
			<?php endif ?>

			<?php $so = get_user_meta($usr->ID, 'stackoverflow', true) ?>
			<?php if ($so) : ?>
				<li><a href="<?php echo $so ?>" class="icon-stack-overflow">StackOverflow</a></li>
			<?php endif ?>

			<?php $gp = get_user_meta($usr->ID, 'googleplus', true) ?>
			<?php if ($gp) : ?>
				<li><a href="<?php echo $gp ?>" class="icon-google-plus">Google+</a></li>
			<?php endif ?>
		</ul>
	<?php endforeach ?>

</section>