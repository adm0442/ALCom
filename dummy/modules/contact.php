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
				'placeholder' => 'e.g. Bill Gates', 
				'required' => true
			), 
			array(
				'name' => 'company', 
				'label' => 'Company', 
				'placeholder' => 'e.g. Apple, Inc.'
			), 
			array(
				'name' => 'email', 
				'type' => 'email', 
				'label' => 'Email', 
				'placeholder' => 'e.g. name@example.com', 
				'required' => true
			), 
			array(
				'name' => 'budget', 
				'label' => 'Approximate budget', 
				'type' => 'range', 
				'min' => '0', 
				'max' => '100000'
			), 
			array(
				'name' => 'deadline', 
				'type' => 'date', 
				'label' => 'Approximate deadline'
			), 
			array(
				'name' => 'message', 
				'type' => 'textarea', 
				'label' => 'Details about the project', 
				'placeholder' => 'e.g. Do you have a website currently? Are you familiar with WordPress? Or anything else you might think is useful.', 
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
