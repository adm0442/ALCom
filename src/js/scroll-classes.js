(function () {
	'use strict';

	var $ = require('jquery');
	var raf = require('raf');

	var lastST = 0;
	var lastSTns = 0; // Last scroll top (no sensitivity)
	var sensitivity = 200;
	var html = $('html');

	var addScrollClasses = function () {
		var st = $(document).scrollTop();
		var dh = $(document).height();

		// If user has scrolled at all
		if (Math.abs(lastSTns - st) > 0) {
			if (st > lastSTns) {
				html.removeClass('scrolling-up scrolling-up-far').addClass('scrolling-down has-scrolled-down');
			}
			else {
				html.removeClass('scrolling-down scrolling-down-far').addClass('scrolling-up has-scrolled-up');
			}

			lastSTns = st;
		}

		// If user has scrolled passed sensitivity
		if (Math.abs(lastST - st) > sensitivity) {
			if (st > lastST) {
				html.removeClass('scrolling-up-far').addClass('scrolling-down-far has-scrolled-down-far');
			}
			else {
				html.removeClass('scrolling-down-far').addClass('scrolling-up-far has-scrolled-up-far');
			}

			lastST = st;
		}

		// User has scrolled down more than half the page
		if (st > dh / 2) {
			html.addClass('scrolling-down-halfway');
		}
		else {
			html.removeClass('scrolling-down-halfway');
		}

		// If user is not at the top of the page
		if (st) {
			html.addClass('has-scrolled').removeClass('at-top');
		}
		// User is at top
		else {
			html.addClass('at-top').removeClass('has-scrolled scrolling-down has-scrolled-down scrolling-down-far has-scrolled-down-far scrolling-up has-scrolled-up scrolling-up-far has-scrolled-up-far');
		}

		raf(addScrollClasses);
	};

	addScrollClasses();
})();
