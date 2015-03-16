<?php
	error_reporting(E_ALL);
	ini_set('display_errors', true);

	include 'plugins/html5form/html5form.php';
?>

<!DOCTYPE html>

<html id="home-page" class="no-js">

	<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>I Build Websites - AndreasLagerkvist.com</title>

		<link rel="stylesheet" href="css/all.css">

		<script>
			document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
		</script>

	</head>

	<body>

		<!--[if lt IE 11]>
			<p class="ie">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

		<noscript>
			<p class="js">You seem to have JavaScript disabled. The site will still function but you're missing out on some features.</p>
		</noscript>

		<?php include 'modules/header.php' ?>
