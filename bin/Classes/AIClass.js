class AI{
	constructor(nn){
		
		if(nn instanceof AI){ // if nn passed
			this.nn = nn.copy()  // copy nn
		} else {
			this.nn = new NeuralNetwork(6,4,2); // new nn
		}
		
		// random color for each player
		let r = random(255)
		let g = random(255)
		let b = random(255)
		this.color = color(r,g,b,100) // game color
		
		this.game = new Game(this.color) // game
		this.score = 0 // current score (reproduction probability)
		this.fit = 0 // current fitness
		this.mouseP = createVector(0,0) // AI mouse position
	}
	
	
	predict(params){
		// targetPos, spellPos, spellV (2D each)
		let inputs = []
		// map parameters to 0,1
		inputs[0] = map(params[0].x,-width,2*width,0,1)
		inputs[1] = map(params[0].y,-height,2*height,0,1)
		inputs[2] = map(params[1].x,-width,2*width,0,1)
		inputs[3] = map(params[1].y,-height,2*height,0,1)
		inputs[4] = map(params[2].x,-width,2*width,0,1)
		inputs[5] = map(params[2].y,-height,2*height,0,1)
		// prediction
		let outputs = this.nn.predict(inputs);
		// Generate mouse position
		this.mouseP = createVector(outputs[0]*width,outputs[1]*height)
	}
	
	// compute AI performance
	fitness(){
		
		// lucky target passed
		if(this.game.score < 2){
			this.game.score = 0
			this.game.time = 0
		}
		// energy
		this.fit = this.game.score + this.game.time/60
		return this.fit
	}
	

	
	// update instance of game and neural network
	update(){
		if (this.game.alive == true){ // if game alive
			// take a decition
			this.predict(this.game.gameParams())
			//update the game with the decition
			this.game.update(this.mouseP)
		}
	}
	
	show(){
		// show the game instance
		this.game.show(this.color)
		// show the nn thoughts
		if(this.game.alive == true){
			fill(this.color)
			stroke(50);
			strokeWeight(10);
			point(this.mouseP.x, this.mouseP.y)
		}
	}
}