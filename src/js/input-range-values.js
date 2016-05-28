(function () {
	'use strict';

	var $ = require('jquery');

	$('input[type=range]').each(function () {
		var input = $(this);
		var label = $('label[for="' + input.attr('id') + '"]');
		var prefix = input.attr('data-value-prefix') || '';
		var suffix = input.attr('data-value-suffix') || '';
		var minText = input.attr('data-min-text') || false;
		var maxText = input.attr('data-max-text') || false;
		var value = $('<span class="value"></span>').appendTo(label);

		var updateValue = function () {
			var niceVal = typeof(number_format) == 'undefined' ? input.val() : number_format(input.val(), 0, ',', ' ');
				niceVal	= prefix + niceVal + suffix;

			niceVal = (input.val() == input.attr('max') && maxText) ? maxText : niceVal;
			niceVal = (input.val() == input.attr('min') && minText) ? minText : niceVal;

			value.html(niceVal);
		};

		updateValue();

		input.on('change input', updateValue);
	});
})();
