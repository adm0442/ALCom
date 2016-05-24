(function () {
	'use strict';

	var mod = document.getElementById('featured-portfolio');

	if (mod) {
		// Grab all items
		var items = mod.getElementsByTagName('article');
		var i = 0;
		var num = items.length;
		var zIndex = 1;

		// Set the first one to active now
		items[i].classList.add('active');
		mod.classList.add('loaded');

		// Goes to the next slide
		var gotoNext = function () {
			var prev = i;

			i = (i + 1 == num ? 0 : i + 1);

			items[i].style.zIndex = ++zIndex;
			items[i].classList.add('active');

			setTimeout(function () {
				items[prev].classList.remove('active');
			}, 1000);
		};

		// Create a button for going to the next slide
		var button = document.createElement('a');

		button.innerHTML = '';
		button.title = 'Next';
		button.href = '#';
		button.className = 'next icon-arrow-down icon--round icon--round--white icon--round--ghost';

		mod.appendChild(button);

		button.addEventListener('click', function (e) {
			e.preventDefault();

			gotoNext();
		});
	}
})();
