class Spell{
	constructor(color){
		this.p = createVector(width/2,height/2); // position
		this.v = createVector(0,0); // velocity
		this.a = createVector(0,0); // acceleration
		this.r = 40; // radius (spell power also)
		this.k = 0.006 // spring constant
		this.c = 0.03 // drag constant
		this.color = color // color
		this.alive = true // health condition
	}
	
	show(){
		// Spell drawing
		stroke(50)
		strokeWeight(2)
		fill(this.color)
		ellipse(this.p.x, this.p.y, 2*this.r, 2*this.r);
	}
	
	addForce(force){
		//a = sum forces / mass. mass = 1
		this.a.add(force);
	}
	
	// (dead beat controller)
	update(playerP) {
		//forces physics. Spring + Drag 
		let deltap = createVector(playerP.x-this.p.x,playerP.y-this.p.y)
		let fSpring = p5.Vector.mult(deltap, this.k);
		let speed = this.v.mag()
		let fDrag = createVector(this.v.x,this.v.y)
		fDrag.mult(-1);
		fDrag.normalize();
		fDrag.mult(this.c * speed);
		// add forces to acceleration
		this.addForce(fSpring)
		this.addForce(fDrag)
		
		// Spell reduction condition
		if(frameCount % 3 == 0){
			this.r -= 1
		}
		
		//die condition
		if(this.r == 0){
			this.alive = false
		}
		
		// propper update
		this.v.add(this.a); // v += a
		this.p.add(this.v); // p += v
		this.a.mult(0); // a = 0 
	}
}