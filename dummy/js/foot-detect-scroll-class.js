App.plugins.DetectScrollClass = {
	init: function () {
		window.addEventListener('scroll', function (e) {
			if (document.body.scrollTop) {
				document.body.classList.add('has-scrolled');
			}
			else {
				document.body.classList.remove('has-scrolled');
			}
		});
	}
};
