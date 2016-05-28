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

	$('#posts-intro').find('ul.tags a').liveFilter('#projects article');

	/* var LiveFilter = {
		init: function (tags, items) {
			var self = this;
			var onclick = function (e) {
				e.preventDefault();
				this.classList.toggle('active');
				self.update(tags, items);
			};

			for (var i = 0; i < tags.length; i++) {
				tags[i].addEventListener('click', onclick);
			}
		},

		update: function (tags, items) {
			var selectedTags = [];
			var i;

			for (i = 0; i < tags.length; i++) {
				if (tags[i].classList.contains('active')) {
					selectedTags.push(tags[i].innerHTML);
				}
			}

			for (i = 0; i < items.length; i++) {
				var hidden = false;

				for (var j = 0; j < selectedTags.length; j++) {
					if (!items[i].classList.contains(selectedTags[j].trim())) {
						hidden = true;
					}
				}

				if (hidden) {
					items[i].classList.add('hidden');
				}
				else {
					items[i].classList.remove('hidden');
				}
			}
		}
	};

	// Run on projects
	var list = document.getElementById('posts-intro').getElementsByTagName('ul');
	var projects = document.getElementById('projects');

	if (list && projects) {
		LiveFilter.init(
			list[0].getElementsByTagName('a'),
			projects.getElementsByTagName('article')
		);
	} */
})();
