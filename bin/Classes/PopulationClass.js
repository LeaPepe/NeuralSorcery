class Population{
	constructor(n){
		this.n = n // number of individuals
		this.generation = 1 // generation
		
		// create individuals
		this.players = []
		for (let i = 0; i < this.n; i++){
			this.players.push(new AI(nnMaster))
		}
	}
	
	// new generation
	repopulate(){
		this.evaluate() // evaluate population
		let newgen = []
		// pick new generation
		for (let i = 0; i < this.n-1; i++){ // for each individual
			let picked = this.pick()
			newgen[i] = new AI(this.players[picked].nn) // new individual with same nn
			newgen[i].nn.mutate(0.4,0.1) // mutate neural network
		}
		newgen[this.n-1] = this.players[this.bestFit] // the last individual is the best fitted one
		this.players = newgen
		this.generation ++ 
	}
	
	// compute fitness parameters
	evaluate(){
		this.bestFit = 0
		let sum = 0
		let f = 0
		for(let i = 0; i < this.n; i++){ // for each individual
			f = this.players[i].fitness() // compute fitness
			sum += f
			if(this.players[this.bestFit] < f){ // best fit search
				this.bestFit = i
			}
		}
		for(let i = 0; i < this.n; i++){ // for each individual
			this.players[i].score = this.players[i].fit/sum // compute reproduction probability
		}
	}
	
	// pick random individual based on reproduction probabilities
	pick(){
		let r = random(1)
		let index = 0
		while(r>0){
			r -= this.players[index].score
			index ++ 
		}
		index--
		return index
	}
	
	// check if everyone is dead
	everyoneDead(){
		for(let i=0; i<this.n; i++){
			if(this.players[i].game.alive == true){
				return false
			}
		}
		return true
	}
	
	// show the individuals
	show(){
		for(let i = 0; i< this.n; i++){
			this.players[i].show()
		}
	}
	
	// update the individuals
	update(){
		// proper update
		for(let i = 0; i< this.n; i++){
			this.players[i].update()
		}
		// if everyone dead, new population
		if(this.everyoneDead() == true){
			console.log("repopulate")
			this.repopulate()
			
		}
	}
}