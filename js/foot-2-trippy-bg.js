var TrippyBG = {
	canvas: false, 
	ctx: false, 
	dim: false, 

	init: function (mod) {
		// Create the canvas
		this.canvas = document.createElement('canvas');

		mod.insertBefore(this.canvas, mod.childNodes[0]);

		this.dim = this.canvas.getBoundingClientRect();
		this.ctx = this.canvas.getContext('2d');

		// Set its width to its rendered width
		this.canvas.width = this.dim.width;
		this.canvas.height = this.dim.height;

		// Do some waves
		this.waves();

	//	this.physics();
	}, 

	physics: function () {
		
	}, 

	waves: function () {
		var self = this;

		// Start drawing waves at this height
		var waveHeight = self.dim.height / 20;
		var offset = self.dim.height - waveHeight * 2;
		var direction = -1;

		// Start drawing
		self.ctx.lineWidth = 1;

		var drawWaves = function (t) {
			offset += .1 * direction;

			if (offset < (0 + waveHeight)) {
				direction = 1;
			}
			else if (offset > (self.dim.height - waveHeight)) {
				direction = -1;
			}

			self.ctx.clearRect(0, 0, self.dim.width, self.dim.height);
			self.ctx.moveTo(0, self.dim.height / 2 + offset);

			for (var x = 0; x < self.dim.width; x++) {
				var yPos = waveHeight * (Math.sin((t + x) * Math.PI / 180) * ((Math.sin(((x * 1.5)) * Math.PI / 180) + 1) / 1.5));
					yPos += offset;

				self.ctx.beginPath();
				self.ctx.moveTo(x, yPos);
				self.ctx.strokeStyle = 'rgba(0, 70, 90, 1)';
				self.ctx.lineTo(x, yPos + self.ctx.lineWidth);
				self.ctx.closePath();
				self.ctx.stroke();

				self.ctx.beginPath();
				self.ctx.moveTo(x, yPos + self.ctx.lineWidth);
				self.ctx.strokeStyle = 'rgba(0, 35, 45, .4)';
				self.ctx.lineTo(x, self.dim.height);
				self.ctx.closePath();
				self.ctx.stroke();
			}
		};

		var t = 0;

		setInterval(function () {
			drawWaves(t += 4);
		}, 50);
	}
};
