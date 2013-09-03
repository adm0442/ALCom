<h3><?php _e('What it does', 'h5b') ?></h3>

<?php echo $plugin['what'] ?>

<h3><?php _e('How to use', 'h5b') ?></h3>

<?php echo $plugin['how'] ?>

<div class="jquery-plugin-example">

	<h3><?php _e('Example', 'h5b') ?></h3>

	<div id="jquery-plugin-<?php echo $plugin['slug'] ?>-example">

		<?php echo $plugin['example'] ?>

	</div>

	<div id="jquery-plugin-<?php echo $plugin['slug'] ?>-example-code">

		<?php echo $plugin['example_code'] ?>

	</div>

	<div id="jquery-plugin-<?php echo $plugin['slug'] ?>-plugin-code">

		<?php echo $plugin['plugin_code'] ?>

	</div>

</div>
