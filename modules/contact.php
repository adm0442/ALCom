<?php
	$thanksTxt = "Thanks! I'll get back to you as soon as possible.";
	$errorTxt = "Something went wrong. Please try again.";

	# Create the form
	$contactForm = new Form('contact');

	$contactForm
		->method('post')
		->action('#contact')
		->classes('ajax')
		->submitTxt("Let's talk")

		->addFields(array(
			array(
				'name' => 'contact_name', 
				'label' => 'Your name', 
				'required' => true
			), 
			array(
				'name' => 'contact_email', 
				'type' => 'email', 
				'label' => 'Email', 
				'required' => true, 
				'validation' => 'validEmail', 
				'error' => 'Please enter a valid e-mail address'
			), 
			array(
				'name' => 'contact_company', 
				'label' => 'Company'
			), 
			array(
				'name' => 'contact_deadline', 
				'type' => 'date', 
				'label' => 'Deadline'
			), 
			array(
				'name' => 'contact_budget', 
				'label' => 'Approximate budget', 
				'type' => 'range', 
				'min' => '0', 
				'max' => '10000', 
				'step' => '500', 
				'value' => '0', 
				'attributes' => array(
					'data-value-prefix' => '€', 
					'data-min-text' => 'Prefer not to say', 
					'data-max-text' => 'More than €10 000'
				)
			), 
			array(
				'name' => 'contact_message', 
				'type' => 'textarea', 
				'label' => 'Details about the project', 
				'placeholder' => 'e.g. Do you currently have a website? Are photos and content available? Or anything else you think might be useful.', 
				'required' => true
			), 
		#	array(
		#		'name' => 'recaptcha', 
		#		'type' => 'html', 
		#		'value' => '<div class="g-recaptcha" data-sitekey="' . RECAPTCHA_SITE_KEY . '"></div>'
		#	), 
			array(
				'name' => 'sleek_module', 
				'type' => 'hidden', 
				'value' => "contact"
			)
		));

	# Handle form submission
	$done = false;
	$errors = false;

	# Form is being submitted
	if ($contactForm->submit()) {
		# Validate
		if ($contactForm->validate()) {
			$mail = fetch(get_stylesheet_directory() . '/inc/html5form/template.php', array('fields' => $contactForm->data()));

			wp_mail(get_option('admin_email'), 'From website', $mail, "Content-type: text/html\r\n");

			$done = true;

			# If AJAX call die right now
			if (XHR) {
				echo json_encode(array('success' => $contactForm->data(), 'msg' => $thanksTxt));

				die;
			}
		}
		else {
			$errors = true;

			# If AJAX call die right now
			if (XHR) {
				echo json_encode(array('success' => false, 'errors' => $contactForm->errors(), 'msg' => $errorTxt));

				die;
			}
		}
	}
?>

<section id="contact">

	<h2>Hire me! <small>...or just send me an e-mail</small></h2>

	<?php # <script src='https://www.google.com/recaptcha/api.js'></script> ?>

	<?php if ($done) : ?>
		<p><strong><?php echo $thanksTxt ?></strong></p>
	<?php else : ?>
		<?php if ($errors) : ?>
			<p><strong><?php echo $errorTxt ?></strong></p>
		<?php endif ?>

		<?php echo $contactForm->render() ?>
	<?php endif ?>

</section>
