App.modules.Header = {
	init: function (mod) {
	//	this.clickableLIs(mod);
	//	this.wrapMenu(mod);
	}, 

	wrapMenu: function (mod) {
		var as = mod.querySelectorAll('div.widget_nav_menu a');

		for (var i = 0; i < as.length; i++) {
			as[i].innerHTML = '<span>' + as[i].innerHTML + '</span>';
		}
	}, 

	clickableLIs: function (mod) {
		var lis = mod.querySelectorAll('div.widget_nav_menu li');

		for (var i = 0; i < lis.length; i++) {
			lis[i].addEventListener('click', function () {
				this.getElementsByTagName('a')[0].click();
			});
		}
	}
};
