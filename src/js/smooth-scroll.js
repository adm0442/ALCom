(function () {
	'use strict';

	var $ = require('jquery');

	$.fn.smoothScroll = function (conf) {
		var config = $.extend({
			offset: {
				top: 0
			}
		}, conf);

		return this.on('click', function (e) {
			e.preventDefault();

			var el = $(this);
			var href = el.attr('href');
			var id = href.substr(href.indexOf('#'));
			var target = $(id);

			if (target.length) {
				var top = target.offset().top - config.offset.top;

				// <html> for Fx - <body> for the rest
				$(document.documentElement).animate({scrollTop: top + 'px'}, 400);
				$(document.body).animate({scrollTop: top + 'px'}, 400);

				/* setTimeout(function () {
					window.location.hash = id;
				}, 400); */

				if (window.history.pushState) {
					window.history.pushState('', document.title, window.location.pathname + window.location.search + href);
				}
			}
		});
	};

	$('a[href="#contact"]').smoothScroll({offset: {top: $(window).width() > 799 ? 52 : 0}});
})();
