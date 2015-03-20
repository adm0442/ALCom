App.plugins.BlurImages = {
	init: function () {
		var images = document.querySelectorAll('img.blur');

		for (var i = 0; i < images.length; i++) {
			(function () {
				var image = images[i];
				var canvas = document.createElement('canvas');

				image.parentNode.appendChild(canvas);

				stackBlurImage(image, canvas, 40);
			})();
		}
	}
};
