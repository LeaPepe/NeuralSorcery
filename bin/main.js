// global variables
p5.disableFriendlyErrors = true
let screen = "startMenu" // for screen selection
let buttons = [] // buttons used for screens
let nnMaster = new NeuralNetwork(6,4,2)


// Setup: runs once
function setup(){
	createCanvas(1280,720) // canvas size
	
	// "global" variables used
	game = new Game(color(200,50,50))
	players = new Population(10)
	
}



// Draw: runs every frame
function draw() {
	background(200,200,50) // background color
	// screen selection
	if(screen == "startMenu"){
		startMenuScreen()
	}else if(screen == "humanGame"){
		humanGameScreen()
	}else if (screen == "neuralGame"){
		neuralGameScreen()
	}else if(screen == "preTrainScreen"){
		preTrainScreen()
	}
}

function mouseClicked(){
	for(let i=0; i<buttons.length; i++){
		if(buttons[i].isPressed(mouseX,mouseY)){
			buttons[i].func()
		}
	}
}

function keyPressed(){
	if(keyCode == 27){
		screen = "startMenu"
	}
}
