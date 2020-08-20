class AICircle {
	constructor(size, canvas) {
		this.size = size;

		this.pos = {
			x: Math.floor(Math.random() * (canvas.width - (this.size * 2) + 1)) + this.size,
			y: Math.floor(Math.random() * (canvas.height - (this.size * 2) + 1)) + this.size
		};


		this.vel = {
			x: (Math.random() > 0.5) ? Math.ceil(Math.random() * 5) : -(Math.ceil(Math.random() * 5)),
			y: (Math.random() > 0.5) ? Math.ceil(Math.random() * 5) : -(Math.ceil(Math.random() * 5))
		}; // basically, randomly choose whether or not to be positive or negative

		this.boundaries = {
			x: canvas.width,
			y: canvas.height
		};

		
		// debugging only

		this.highlighted = false;
	}

	update() {
		if(
			(this.pos.x + this.vel.x) >= this.boundaries.x - this.size ||
			(this.pos.x + this.vel.x) <= this.size
		) {
			this.vel.x *= -1;
		}

		if(
			(this.pos.y + this.vel.y) >= this.boundaries.y - this.size ||
			(this.pos.y + this.vel.y) <= this.size
		) {
			this.vel.y *= -1;
		}

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	draw(ctx) {
		let inner = new Path2D(), outer = new Path2D(); // saves a line or two

		
		if(this.highlighted) {ctx.save(); ctx.fillStyle = "#00ff00"}

		inner.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
		ctx.fill(inner);

		if(this.highlighted) {ctx.restore()}


		outer.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
		ctx.stroke(outer);


		ctx.save();

		ctx.fillStyle = "#000000";
		ctx.fillRect(this.pos.x - 2, this.pos.y - 2, 4, 4);

		ctx.restore();
	}
}