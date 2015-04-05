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

		// Sticky sidebar
		var html = document.documentElement;

		if (window.innerWidth > 800 && html.classList.contains('single-post') || html.classList.contains('single-projects')) {
			var aside = document.querySelector('main aside');
			var offset = document.getElementById('header').offsetHeight + 20;
			var stopBefore = document.getElementById('pagination') || document.getElementById('disqus') || false;

			Sticky.init(aside, offset, stopBefore);
		}

		// Canvas backgrounds in header
		this.trippyBG();

	//	this.clickableLIs(mod);
	//	this.wrapMenu(mod);
	}, 

	trippyBG: function () {
		// Add heros here
		var appendTo =	document.querySelector('#post header') ||
						document.querySelector('#project header') ||
						document.querySelector('#four-o-four header') ||
						document.querySelector('#posts-intro');

		if (appendTo) {
			// Don't run waves on heros with images
			for (var i = 0; i < appendTo.children.length; i++) {
				if (appendTo.children[i].tagName.toUpperCase() == 'IMG') {
					appendTo = false;
					break;
				}
			}

			// Don't run in lo res
			if (appendTo && window.innerWidth > 800) {
				TrippyBG.init(appendTo);
			}
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
