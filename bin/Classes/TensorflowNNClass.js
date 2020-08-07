class TfNetwork{
	constructor(inp,outp,hidd){
		let nn = tf.sequential()
		nn.add(tf.layers.dense({inputShape: [inp], units: hidd, activation: 'sigmoid'}))
		nn.add(tf.layers.dense({inputShape: [hidd], units: outp, activation: 'sigmoid'}))
		this.nn = nn
		
	}
	
	predict(inputs){
		return outputs
	}
	
}