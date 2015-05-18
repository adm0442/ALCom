var TrippyBG = {
	canvas: false, 
	ctx: false, 
	dim: false, 

	init: function (mod) {
		// Create the canvas
		this.canvas = document.createElement('canvas');

		// Add to requested element
		// If the element has a direct child img - add the canvas AFTER the img
		var inserted = false;

		for (var i = 0; i < mod.children.length; i++) {
			if (mod.children[i].tagName.toUpperCase() == 'IMG') {
				mod.insertBefore(this.canvas, mod.children[i].nextSibling);
				inserted = true;
				break;
			}
		}

		if (!inserted) {
			mod.insertBefore(this.canvas, mod.childNodes[0]);
		}

		this.dim = this.canvas.getBoundingClientRect();
		this.ctx = this.canvas.getContext('2d');

		// Set its width to its rendered width
		this.canvas.width = this.dim.width;
		this.canvas.height = this.dim.height;

		// Waves or physics
		if (false && Math.round(Math.random())) {
			this.waves();
		}
		else {
			var self = this;

			App.utils.loadScript(STYLESHEET_DIRECTORY + '/js/Box2dWeb-2.1.a.3.min.js', function () {
				self.physics();
			});
		}
	}, 

	// Box2d
	physics: function () {
		var self = this;

		this.canvas.style.opacity = .2;

		// Shortcuts
		var b2World = Box2D.Dynamics.b2World;
		var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		var b2Vec2 = Box2D.Common.Math.b2Vec2;
		var b2Body = Box2D.Dynamics.b2Body;
		var b2BodyDef = Box2D.Dynamics.b2BodyDef;
		var b2Fixture = Box2D.Dynamics.b2Fixture;
		var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
		var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
		var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

		var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

		// Config
		var gravity = 25;
		var pxPerM = 30;
		var canvasW = this.dim.width;
		var canvasH = this.dim.height;

		// Box2d vars
		var world = new b2World(new b2Vec2(0, gravity), true);

		// Debug draw
		var debugDraw = new b2DebugDraw();

		debugDraw.SetSprite(this.ctx);
		debugDraw.SetDrawScale(30.0);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

		world.SetDebugDraw(debugDraw);

		// Create box or ball
		var createObject = function (x, y, r, shape, type) {
			var bodyDef = new b2BodyDef;
			var fixtureDef = new b2FixtureDef;

			bodyDef.type = typeof(type) != 'undefined' ? type : b2Body.b2_dynamicBody;

			// Position in the middle - above screen
			bodyDef.position.x = x;
			bodyDef.position.y = y;

			// Random sized box
			fixtureDef.shape = shape;

			// Tweaking
			fixtureDef.density = 4;
			fixtureDef.friction = 0.5;
			fixtureDef.restitution = 0.1;

			// Create
			var body = world.CreateBody(bodyDef);
			var fixture = body.CreateFixture(fixtureDef);

			// Spin
			if (r) {
				body.SetAngularVelocity(r);
			}

			return {
				bodyDef: bodyDef, 
				fixtureDef: fixtureDef, 
				body: body, 
				fixture: fixture
			};
		};

		// Creates a box
		var createBox = function (x, y, w, h, r, type) {
			var shape = new b2PolygonShape;
			shape.SetAsBox(w, h);

			return createObject(x, y, r, shape, type);
		};

		// Creates a ball
		var createBall = function (x, y, s, r, type) {
			return createObject(x, y, r, new b2CircleShape(s), type);
		};

		// Create ground
		var ground = createBox(0, canvasH / pxPerM + 1, (canvasW / pxPerM) * 3, 1, 0, b2Body.b2_staticBody);
		var groundLevel = canvasH / pxPerM;

		// Build a pyramid of boxes
		var buildPyramid = function (baseNum, size, offsetX, offsetY) {
			var baseNum = baseNum || 5;
			var size = size || 1;
			var boxes = [];

			for (var row = 0; row < baseNum; row++) {
				for (var col = 0; col < (baseNum - row); col++) {
					var x = (col * size) + (row * (size / 2)) + offsetX;
					var y = -((row * size) - offsetY);

					boxes.push(createBox(x, y, size / 2, size / 2, 0, b2Body.b2_dynamicBody));
				}
			}

			return boxes;
		};

		// Bowling
		if (Math.round(Math.random())) {
			var baseNum = 10;
			var boxSize = 1;
			var boxes = buildPyramid(baseNum, boxSize, ((canvasW / pxPerM) / 2 + (boxSize / 2) - (boxSize * baseNum / 2)), groundLevel - 1);
			var balls = [];

			setInterval(function () {
				var newBallX = Math.round(Math.random()) ? -5 : (canvasW / pxPerM) + 5;
				var newBall = createBall(newBallX, Math.random() * (groundLevel / 2) + (groundLevel / 2), 1, 0, b2Body.b2_dynamicBody);

				balls.push(newBall);

				if (newBallX > 0) {
					newBall.body.ApplyImpulse(new b2Vec2(-3000, 0), newBall.body.GetWorldCenter());
				}
				else {
					newBall.body.ApplyImpulse(new b2Vec2(3000, 0), newBall.body.GetWorldCenter());
				}
			}, 5000);
		}
		// Create boxes every 5 seconds
		else {
			var objects = [];
			var maxW = 1.5;
			var maxH = 1.5;

			objects.push(createBox(
				(canvasW / pxPerM) / 2 + (Math.random() * 4 - 2), 
				-10, 
				Math.random() * maxW + 0.5, 
				Math.random() * maxH + 0.5, 
				Math.random() * 20 - 10
			));

			setInterval(function () {
				if (Math.round(Math.random() * 2) == 2) {
					objects.push(createBall(
						(canvasW / pxPerM) / 2 + (Math.random() * 4 - 2), 
						-5, 
						Math.random() * maxW + 0.5, 
						Math.random() * 20 - 10
					));
				}
				else {
					objects.push(createBox(
						(canvasW / pxPerM) / 2 + (Math.random() * 4 - 2), 
						-5, 
						Math.random() * maxW + 0.5, 
						Math.random() * maxH + 0.5, 
						Math.random() * 20 - 10
					));
				}
			}, 5000);
		}

		// Update
		var update = function () {
			world.Step(1 / 60, 3, 3);
			world.DrawDebugData();
			world.ClearForces();

			raf(update);
		};

		raf(update);
	}, 

	// Sinus/cosinus waves
	waves: function () {
		var self = this;

		// Start drawing waves at this height
		var waveHeight = self.dim.height / 20;
		var offset = self.dim.height - waveHeight * 2;
		var direction = -1;
		var time = new Date().getTime();
		var dt = 0;
		var i = 0;

		// Start drawing
		self.ctx.lineWidth = 1;

		var drawWaves = function () {
			dt = (new Date().getTime() - time) / 1000;
			time = new Date().getTime();

			offset += (1 * dt) * direction;
			i += (100 * dt);

			if (offset < (0 + waveHeight)) {
				direction = 1;
			}
			else if (offset > (self.dim.height - waveHeight)) {
				direction = -1;
			}

			self.ctx.clearRect(0, 0, self.dim.width, self.dim.height);
			self.ctx.moveTo(0, self.dim.height / 2 + offset);

			for (var x = 0; x < self.dim.width; x++) {
				var yPos = waveHeight * (Math.sin((i + x) * Math.PI / 180) * ((Math.sin(((x * 1.5)) * Math.PI / 180) + 1) / 1.5));
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

			var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

			raf(drawWaves);
		};

		var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

		raf(drawWaves);
	}
};
