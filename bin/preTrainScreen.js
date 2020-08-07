function preTrainScreen(){
	
	// training scenario
	let trainSpell = new Spell(color(200))
	let trainTarget = new Target(color(200))
	// suboptimal guess
	let desired = subOptimalGuess(trainSpell,trainTarget)
	// input for nn
	let inputs = []
	inputs[0] = map(trainTarget.p.x,0,width,0,1)
	inputs[1] = map(trainTarget.p.y,0,height,0,1)
	inputs[2] = map(trainSpell.p.x,0,width,0,1)
	inputs[3] = map(trainSpell.p.y,0,height,0,1)
	inputs[4] = random(1)
	inputs[5] = random(1)
	//training 1 batch
	nnMaster.train2(inputs,desired)
	// error log debug
	nnMaster.error(inputs,desired)
}

function subOptimalGuess(spell,target){
	// suboptimal guess: put the mouse in the target
	let guessX = map(target.p.x,0,width,0,1)
	let guessY = map(target.p.y,0,height,0,1)
	return [guessX,guessY]
}