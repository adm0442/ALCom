(function () {
	'use strict';

	var $ = require('jquery');
	var stickyfill = require('stickyfill')();

	var runSticky = function () {
		var winWidth = $(window).width();

		stickyfill.kill();

		$('.sticky').each(function () {
			stickyfill.add(this);
		});

		if (winWidth > 759) {
			$('.sticky--bp-medium').each(function () {
				stickyfill.add(this);
			});
		}

		stickyfill.init();
	};

	runSticky();

	$(window).on('resize', function () {
		runSticky();
	});
})();
