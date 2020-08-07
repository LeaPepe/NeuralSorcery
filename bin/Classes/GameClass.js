class Game{
	constructor(color){
		this.score = 0 // targets killed
		this.time = 0 // frames elapsed
		this.color = color // game color distintion
		this.alive = true // health condition of the game
		this.spell = new Spell(this.color) // spell
		this.target = new Target(this.color) // target
	}
	
	//recieves player movement decition
	update(playerP){
		if (this.collide() == true){ // if spell collide target
			this.target = new Target(this.color) // new target
			this.score ++ // +1 score
			this.spell.r = 40 // regenerate spell power
		}
		if (this.spell.alive == false){ // if spell died
			this.die()  // game died
			return // and dont update
		} else { // if spell is alive
			this.time += 1 // +1 frame elapsed
			this.spell.update(playerP) // update spell movement
			this.target.update() // update target (not used yet)
		}
	}
	
	// show the game in canvas
	show(){
	  if (this.alive == true){
		this.spell.show() // spell draw
	    this.target.show() // target draw
	  }
	}
	
	die(){ // death consecuences
		this.alive = false
	}
	
	reset(){ // reset.
		this.spell.p.x = width/2
		this.spell.p.y = height/2
		this.spell.r = 40
		this.spell.alive = true
		this.alive = true
		this.score = 0
		this.time = 0
	}
	
	// collide detection
	collide(){
		// if distance between centers is less than sum of radius
		let deltax = this.spell.p.x - this.target.p.x
		let deltay = this.spell.p.y - this.target.p.y
		let d2 = (deltax*deltax) + (deltay*deltay)
		let r = this.spell.r + this.target.r
		if(d2 <= r*r ){
			return true
		} else {
			return false
		}
	}
	
	// parameters used for neural network decition
	gameParams(){
		let params = [this.target.p, this.spell.p, this.spell.v]
		return params
	}
}