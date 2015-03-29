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

		// Expand codeblocks on hover
		HoverExpand.init();

		// Theme stuff
	//	BlurImages.init('img.blur');
	//	CanvasLogo.init('canvas.al-logo');

		this.trippyBG();

	//	this.clickableLIs(mod);
	//	this.wrapMenu(mod);
	}, 

	trippyBG: function () {
		var appendTo =	document.querySelector('#post header') ||
						document.querySelector('#project header') ||
						document.querySelector('#four-o-four header') ||
						document.querySelector('#posts-intro');

		if (appendTo && window.innerWidth > 800 && !appendTo.getElementsByTagName('img').length) {
			TrippyBG.init(appendTo);
		}
	}, 

	// Not in use, attempts at making the whole menu item clickable ... :/
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
