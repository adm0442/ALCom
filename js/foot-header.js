App.modules.Header = {
	init: function () {
		var lis = document.getElementById('header').querySelectorAll('div.widget_nav_menu li');

		for (var i = 0; i < lis.length; i++) {
			lis[i].addEventListener('click', function () {
				this.getElementsByTagName('a')[0].click();
			});
		}
	}
};
