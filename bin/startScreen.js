function startMenuScreen(){
	background(50,200,50) // background color
	// buttons show
	buttons = createStartButtons()
	for(let i = 0; i<buttons.length; i++){
		buttons[i].show()
	}
}

function createStartButtons(){
	let btns = []
	btns[0] = new Button(width/2,350,200,50,"Play!")
	btns[0].func = function(){ screen = "humanGame"}
	btns[1] = new Button(width/2,410,200,50,"Watch!")
	btns[1].func = function(){ screen = "neuralGame"; players = new Population(10)}
	btns[2] = new Button(width/2,470,200,50,"Pretrain")
	btns[2].func = function(){ screen = "preTrainScreen"}
	return btns
}