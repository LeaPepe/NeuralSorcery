// screen when a human is playing
function humanGameScreen(){
	background(200,200,50) // background color
	
	//human died condition
	if (game.alive == false){
		humanDeadScreen() // dead screen
		return
	}
	// player input
	playerP = createVector(mouseX,mouseY)
	//game update
	fill(255,255,255) //scoreboard
	textSize(20)
	game.update(playerP)
	text('score: ' + game.score, width/2, 30);
	text('time: ' + game.time, width/2, 60);
	game.show()
}

//screen when he dies
function humanDeadScreen(){
	//show score and time
	fill(255,255,255) //scoreboard
	textSize(40)
	textAlign(CENTER,CENTER)
	text('score: ' + game.score, width/2, 200);
	text('time: ' + game.time, width/2, 260);
	buttons = createDeadButton()
	
	//buttons show
	for(let i = 0; i<buttons.length; i++){
		buttons[i].show()
	}
}


// dead menu buttons
function createDeadButton(){
	let btns = []
	btns[0] = new Button(width/2,350,200,50,"Play again!")
	btns[0].func = function(){ game.reset()}
	btns[1] = new Button(width/2,410,200,50,"Main menu")
	btns[1].func = function(){ game.reset(); screen = "startMenu"}
	return btns
}