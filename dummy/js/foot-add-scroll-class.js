App.plugins.AddScrollClass = {
	init: function () {
		window.addEventListener('scroll', function (e) {
			var st = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;

			if (st) {
				document.body.classList.add('has-scrolled');
			}
			else {
				document.body.classList.remove('has-scrolled');
			}
		});
	}
};
