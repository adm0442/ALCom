App.plugins.AddScrollClass = {
	init: function () {
		var lastST = 0;
		var sensitivity = 100;

		window.addEventListener('scroll', function (e) {
			var st = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;

			// Check if at top
			if (st) {
				document.body.classList.add('has-scrolled');
			}
			else {
				document.body.classList.remove('has-scrolled');
			}

			// Check direction
			if (Math.abs(lastST - st) > sensitivity) {
				if (st > lastST) {
					document.body.classList.remove('scrolling-up');
					document.body.classList.add('scrolling-down');
				}
				else {
					document.body.classList.remove('scrolling-down');
					document.body.classList.add('scrolling-up');
				}

				lastST = st;
			}
		});
	}
};
