App.modules.Header = {
	init: function (mod) {
		// Adds "has-scrolled", "scrolling-down" etc to <html> (for styling purposes)
		ScrollClasses.init();

		// Hijaxes all form.ajax
		AjaxForms.init('form.ajax');

		// Zooms all img-links 
		ImageZoom.init(document.body);

		// Some nice utlities for input[type=range]
		InputRangeUtils.values(); // Display value of input next to label
		InputRangeUtils.colors(); // Different colors on left/right side

		// Live Ajax Search
	//	LiveSearch.init(document.querySelector('input[name=s]'), '/?s=', 'after');

		// Smoothly scroll #in-page-links
		SmoothScrolling.init((window.innerWidth < 800 ? 0 : 50));

		// Theme stuff
	//	BlurImages.init('img.blur');
	//	CanvasLogo.init('canvas.al-logo');
		HoverExpand.init();

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
