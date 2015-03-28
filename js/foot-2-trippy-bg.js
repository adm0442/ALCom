var TrippyBG = {
	init: function (mod) {
		// Create the canvas
		var canvas = document.createElement('canvas');

		mod.insertBefore(canvas, mod.childNodes[0]);

		var dim = canvas.getBoundingClientRect();

		// Set its width to its rendered width
		canvas.width = dim.width;
		canvas.height = dim.height;

		// Start drawing waves at this height
		var waveHeight = dim.height / 20;
		var offset = dim.height - waveHeight * 2;
		var direction = -1;

		// Start drawing
		var ctx = canvas.getContext('2d');

		ctx.lineWidth = 1;

		var drawWaves = function (t) {
			offset += .1 * direction;

			if (offset < (0 + waveHeight)) {
				direction = 1;
			}
			else if (offset > (dim.height - waveHeight)) {
				direction = -1;
			}

			ctx.clearRect(0, 0, dim.width, dim.height);
			ctx.moveTo(0, dim.height / 2 + offset);

			for (var x = 0; x < dim.width; x++) {
				var yPos = waveHeight * (Math.sin((t + x) * Math.PI / 180) * ((Math.sin(((x * 1.5)) * Math.PI / 180) + 1) / 1.5));
					yPos += offset;

				ctx.beginPath();
				ctx.moveTo(x, yPos);
				ctx.strokeStyle = 'rgba(0, 70, 90, 1)';
				ctx.lineTo(x, yPos + ctx.lineWidth);
				ctx.closePath();
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(x, yPos + ctx.lineWidth);
				ctx.strokeStyle = 'rgba(0, 35, 45, .4)';
				ctx.lineTo(x, dim.height);
				ctx.closePath();
				ctx.stroke();
			}
		};

		var t = 0;

		setInterval(function () {
			drawWaves(t += 4);
		}, 50);
	}
};
