<?php
	# Create the form
	$contactForm = new Form('contact');

	$contactForm
		->method('post')
		->action('#contact')

		->addFields(array(
			array(
				'name' => 'name', 
				'label' => 'Your name', 
				'required' => true
			), 
			array(
				'name' => 'company', 
				'label' => 'Company'
			), 
			array(
				'name' => 'email', 
				'type' => 'email', 
				'label' => 'Email', 
				'required' => true
			), 
			array(
				'name' => 'message', 
				'type' => 'textarea', 
				'label' => 'Message', 
				'required' => true
			), 
			array(
				'name' => 'submit', 
				'type' => 'submit', 
				'value' => "Let's talk"
			)
		));

	# Handle form submission
	$done = false;
	$errors = false;

	# Form is being submitted
	if ($contactForm->submit()) {
		# Validate
		if ($contactForm->validate()) {
			var_dump($contactForm->data());

			$done = true;

			# If AJAX call die right now
			if (XHR) {
				echo json_encode(array('success' => $contactForm->data()));

				die;
			}
		}
		else {
			$errors = true;

			# If AJAX call die right now
			if (XHR) {
				echo json_encode(array('success' => false, 'errors' => $contactForm->errors()));

				die;
			}
		}
	}
?>

<section id="contact">

	<h2>Hire me!</h2>

	<p>...or just send me an e-mail</p>

	<?php if ($done) : ?>
		<p><strong>[MESSAGE RECEIVED]</strong></p>
	<?php else : ?>
		<?php echo $contactForm->render() ?>
	<?php endif ?>

</section>
