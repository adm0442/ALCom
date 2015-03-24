App.plugins.CanvasLogo = {
	init: function () {
		var color = '#fc3';
		var canvass = document.querySelectorAll('canvas.al-logo');

		for (var i = 0; i < canvass.length; i++) {
			(function () {
				var canvas = canvass[i];
				var ctx = canvas.getContext('2d');

				var width = canvas.width;
				var height = canvas.height;

				var thickness = Math.round(width / 15);
				var startX = thickness / 2;
				var startY = height;
				var endX = startX + width * .5; // The A should be about half the width
				var endY = startY - height * .2; // The curve into the L should be roughly a fifth of the entire height
				var peakX = startX + width * .25;
				var peakY = 0;

				ctx.lineWidth = thickness;
				ctx.strokeStyle = color;

				// Draw the first bend
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.quadraticCurveTo(peakX, peakY, endX, endY);
				ctx.stroke();

				// Draw the second bend
				ctx.quadraticCurveTo(startX + width * .5 + width * .1, startY - height * .1, width, startY);
				ctx.stroke();
			})();
		}
	}
};
