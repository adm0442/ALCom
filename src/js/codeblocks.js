(function () {
	'use strict';

	var $ = require('jquery');

	$('pre code').each(function () {
		var code = $(this);

		code.addClass('prettyprint');
	});
})();
