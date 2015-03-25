App.modules.Header = {
	init: function () {
	//	this.clickableLIs();
	//	this.wrapMenu();
	}, 

	wrapMenu: function () {
		var as = document.getElementById('header').querySelectorAll('div.widget_nav_menu a');

		for (var i = 0; i < as.length; i++) {
			as[i].innerHTML = '<span>' + as[i].innerHTML + '</span>';
		}
	}, 

	clickableLIs: function () {
		var lis = document.getElementById('header').querySelectorAll('div.widget_nav_menu li');

		for (var i = 0; i < lis.length; i++) {
			lis[i].addEventListener('click', function () {
				this.getElementsByTagName('a')[0].click();
			});
		}
	}
};
