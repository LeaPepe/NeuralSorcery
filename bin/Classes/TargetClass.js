class Target{
	constructor(color){
		this.r = 40 // target radius
		let randX = random(width-2*this.r) // random spawn 
		let randY = random(height-2*this.r)
		this.p = createVector(randX,randY); // random position defined
		this.color = color // target color
	}
	
	show(){
		// target draw
		stroke(50);
		strokeWeight(2);
		fill(this.color);
		ellipse(this.p.x, this.p.y, 2*this.r, 2*this.r);
		fill(200,200,200);
		ellipse(this.p.x, this.p.y, 2*this.r*2/3, 2*this.r*2/3);
		fill(this.color);
		ellipse(this.p.x, this.p.y, 2*this.r*1/3, 2*this.r*1/3);
	}
	update(){
		//target doesnt update (yet)
	}
}