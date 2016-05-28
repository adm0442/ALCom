(function () {
	'use strict';

	var $ = require('jquery');

	$.fn.liveFilter = function (itms, conf) {
		var items = $(itms);
		var tags = $(this);
		var config = $.extend({
			multiple: false,
			relation: 'or'
		}, conf);

		var updateTags = function () {
			var selectedTags = [];

			tags.filter('.active').each(function () {
				var tag = $(this);

				selectedTags.push('.' + $.trim(tag.html()));
			});

			var classList = config.relation === 'or' ? selectedTags.join(',') : selectedTags.join('');

			items.removeClass('hidden');

			if (selectedTags.length) {
				items.each(function () {
					var item = $(this);

					if (!item.is(classList)) {
						item.addClass('hidden');
					}
				});
			}
		};

		tags.on('click', function (e) {
			var tag = $(this);

			e.preventDefault();

			if (config.multiple === false) {
				if (tag.is('.active')) {
					tags.removeClass('active');
				}
				else {
					tags.removeClass('active');
					tag.addClass('active');
				}
			}
			else {
				tag.toggleClass('active');
			}

			updateTags();
		});
	};

	if ($('#projects').length) {
		$('#posts-intro').find('ul.tags a').liveFilter('#projects article');
	}
	else if ($('#portfolios').length) {
		$('#posts-intro').find('ul.tags a').liveFilter('#portfolios article');
	}
})();
