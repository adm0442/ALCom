(function () {
	'use strict';

	var $ = require('jquery');

	$('code').each(function () {
		var code = $(this);

		code.addClass('prettyprint');
	});
})();
