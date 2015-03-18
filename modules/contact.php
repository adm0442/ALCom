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
				'name' => 'email', 
				'type' => 'email', 
				'label' => 'Email', 
				'required' => true
			), 
			array(
				'name' => 'company', 
				'label' => 'Company'
			), 
			array(
				'name' => 'deadline', 
				'type' => 'date', 
				'label' => 'Deadline'
			), 
			array(
				'name' => 'budget', 
				'label' => 'Approximate budget', 
				'type' => 'range', 
				'min' => '0', 
				'max' => '10000', 
				'step' => '500', 
				'value' => '0', 
				'attributes' => array(
					'data-value-type-before' => '€'
				)
			), 
			array(
				'name' => 'message', 
				'type' => 'textarea', 
				'label' => 'Details about the project', 
				'placeholder' => 'e.g. Do you currently have a website? Are photos and content available? Or anything else you think might be useful.', 
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

	<h2>Hire me! <small>...or just send me an e-mail</small></h2>

	<?php if ($done) : ?>
		<p><strong>[MESSAGE RECEIVED]</strong></p>
	<?php else : ?>
		<?php echo $contactForm->render() ?>
	<?php endif ?>

</section>
