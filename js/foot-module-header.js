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

	//	this.trippyBG();
	//	this.clickableLIs(mod);
	//	this.wrapMenu(mod);
	}, 

	trippyBG: function () {
		var mod = document.getElementById('posts-intro');

		// Create the canvas
		var canvas = document.createElement('canvas');

		mod.insertBefore(canvas, mod.childNodes[0]);

		var dim = canvas.getBoundingClientRect();

		// Set its width to its rendered width
		canvas.width = dim.width;
		canvas.height = dim.height;

		// Start drawing waves at this height
		var offset = dim.height / 2;
		var waveHeight = dim.height / 20;

		// Start drawing
		var ctx = canvas.getContext('2d');

		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'green';
		ctx.lineWidth = 2;

		var drawWaves = function (t) {
			ctx.clearRect(0, 0, dim.width, dim.height);

			ctx.beginPath();

			ctx.moveTo(0, dim.height / 2);

			for (var x = 0; x < dim.width; x++) {
				var tmpWaveHeight = (Math.sin(x) * Math.PI / 180);

				ctx.lineTo(x, waveHeight * Math.sin((t + x) * Math.PI / 180) + offset);
			}

			ctx.stroke();
		};

		var t = 0;

		setInterval(function () {
			drawWaves(t += 10);
		}, 50);
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
