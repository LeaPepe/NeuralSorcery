class Button{
	constructor(cx,cy,w,h,name){
		this.name = name
		this.cx = cx
		this.cy = cy
		this.w = w
		this.h = h
		this.active = false
		this.activeColor = color(255,255,255)
		this.pasiveColor = color(200,200,200)
	}
	
	show(){
		//rectangle
		strokeWeight(4);
		if(this.active == true){
			fill(this.activeColor)
		}else{
			fill(this.pasiveColor)
		}
		rectMode(CENTER)
		rect(this.cx,this.cy,this.w,this.h)
		//text
		strokeWeight(2);
		textSize(35)
		textAlign(CENTER,CENTER)
		//textFont(font)
		fill(color(10,10,10))
		text(this.name, this.cx, this.cy);
	}
	
	isPressed(x,y){
		let xi = this.cx - this.w/2
		let xf = this.cx + this.w/2
		let yi = this.cy - this.h/2
		let yf = this.cy + this.h/2
		if(x>xi && x<xf && y>yi && y<yf){
			return true
		}
		return false
	}
}