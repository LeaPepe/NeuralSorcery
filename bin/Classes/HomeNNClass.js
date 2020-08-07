class NeuralNetwork{
	constructor(nInputs, nHiddens, nOutputs) {
		// nn copy
		this.sigma = 1
		this.lr = 0.2
		if (arguments[0] instanceof NeuralNetwork) {
			let nn = arguments[0]
			// parameters
			this.nInputs = nn.nInputs
			this.nHiddens = nn.nHiddens
			this.nOutputs = nn.nOutputs
			// weights
			this.w1 = nn.w1.copy()
			this.w2 = nn.w2.copy()
			// biases
			this.b1 = nn.b1.copy()
			this.b2 = nn.b2.copy()
			return
		}
		// new nn
		// parameters
		this.nInputs = nInputs
		this.nHiddens = nHiddens
		this.nOutputs = nOutputs
		// weights
		this.w1 = tf.randomNormal([this.nHiddens, this.nInputs]).mul(this.sigma)
		this.w2 = tf.randomNormal([this.nOutputs, this.nHiddens]).mul(this.sigma)
		// biases
		this.b1 = tf.randomNormal([this.nHiddens]).mul(this.sigma)
		this.b2 = tf.randomNormal([this.nOutputs]).mul(this.sigma)
	}

	// FeedForward
	predict(inputArray) {
		//inputs
		let inputs = tf.tensor(inputArray)
		// hidden = input * w1 + b1
		let hiddens = tf.dot(this.w1, inputs)
		hiddens.add(this.b1)
		// Activation function
		hiddens = hiddens.sigmoid() 
		// output = hidden * w2 + b2
		let outputs = tf.dot(this.w2, hiddens);
		outputs.add(this.b2)
		// Activation function
		outputs = outputs.sigmoid()
		// return the output
		let answer = outputs.arraySync()
		return answer
	}
	
	dsigmoid(x){
		let sigm = tf.sigmoid(x)
		let dsigm = sigm.mul(tf.onesLike(sigm).sub(sigm))
		return dsigm
	}
	
	// Backpropagation train
	train(i, o){
		// Feedforward vectores
		let inputs = tf.tensor(i);
		let hiddens = tf.dot(this.w1, inputs);
		hiddens.add(this.b1);
		hiddens = hiddens.sigmoid()
		let outputs = tf.dot(this.w2, hiddens);
		outputs.add(this.b2);
		outputs = outputs.sigmoid()

		// errors
		// error = desired - predicted
		let desired = tf.tensor(o);
		let errorO = tf.sub(desired, outputs);

		// gradient
		let gradientO = this.dsigmoid(outputs)
		gradientO.mul(errorO);
		gradientO.mul(this.lr);
		// Calculate delta
		let dw2 = tf.outerProduct(gradientO,hiddens)

		// Adjust the weights by deltas
		this.w2.add(dw2);
		// Adjust the bias by its deltas (which is just the gradients)
		this.b2.add(gradientO);

		// Calculate the hidden layer errors
		let errorH = tf.dot(this.w2.transpose(), errorO);

		// Calculate hidden gradient
		let gradientH = this.dsigmoid(hiddens)
		gradientH.dot(errorH);
		gradientH.mul(this.lr);

		// Calcuate input->hidden deltas
		let dw1 = tf.outerProduct(gradientH, inputs);
		//dw1.print()
		this.w1.add(dw1);
		// Adjust the bias by its deltas (which is just the gradients)
		this.b1.add(gradientH);
	}
	// Backpropagation train
	train2(i, o){
		// Feedforward vectores
		let inputs = tf.tensor(i);
		let h1= tf.dot(this.w1, inputs);
		h1.add(this.b1);
		let v1 = h1.sigmoid()
		let h2 = tf.dot(this.w2, v1);
		h2.add(this.b2);
		let v2 = h2.sigmoid()

		// errors
		// error = desired - predicted
		let desired = tf.tensor(o);
		let err2 = tf.sub(desired, v2);

		// gradient
		let gradient2 = this.dsigmoid(h2)
		gradient2.mul(err2);
		gradient2.mul(this.lr);
		// Calculate delta
		let dw2 = tf.outerProduct(gradient2,v1)

		// Adjust the weights by deltas
		this.w2.add(dw2);
		// Adjust the bias by its deltas (which is just the gradients)
		this.b2.add(gradient2);

		// Calculate the hidden layer errors
		let err1 = tf.dot(this.w2.transpose(), gradient2);

		// Calculate hidden gradient
		let gradient1 = this.dsigmoid(h1)
		gradient1.dot(err1);
		gradient1.mul(this.lr);

		// Calcuate input->hidden deltas
		let dw1 = tf.outerProduct(gradient1, inputs);
		//dw1.print()
		this.w1.add(dw1);
		// Adjust the bias by its deltas (which is just the gradients)
		this.b1.add(gradient1);
	}
	mutate(prob,sigma){
		if(random() > prob){
			return
		}
		// weights and biases
		let dw1 = tf.randomNormal([this.nHiddens, this.nInputs]).mul(sigma)
		let dw2 = tf.randomNormal([this.nOutputs, this.nHiddens]).mul(sigma)
		let db1 = tf.randomNormal([this.nHiddens, 1]).mul(sigma)
		let db2 = tf.randomNormal([this.nOutputs, 1]).mul(sigma)
		this.w1.add(dw1)
		this.w2.add(dw2)
		this.b1.add(db1)
		this.b2.add(db2)
	}
	
	crossover(nn){
		
	}
	
	error(input,desired){
		let output = this.predict(input,desired)
		//console.log(desired)
		//console.log(output)
		let err = 0
		for(let i = 0; i < desired.length; i++){
			err += (desired[i] - output[i]) * (desired[i] - output[i])
		}
		console.log(0.5 * err)
		return 0.5 * err
	}
	
	copy(){
		return new NeuralNetwork(this)
	}
  
// for storing model
  // serialize() {
    // return JSON.stringify(this);
  // }

  // static deserialize(data) {
    // if (typeof data == 'string') {
      // data = JSON.parse(data);
    // }
    // let nn = new NeuralNetwork(
      // data.inputs,
      // data.hiddens,
      // data.outputs
    // );
    // nn.w1 = Matrix.deserialize(data.w1);
    // nn.w2 = Matrix.deserialize(data.w2);
    // nn.b1 = Matrix.deserialize(data.b1);
    // nn.b2 = Matrix.deserialize(data.b2);
    // return nn;
  // }
}