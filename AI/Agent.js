

export default class Agent {
	constructor(isMax = true, game) {
		this.isMax = isMax;
		this.game = game
	}


	miniMax(isMax) {
		throw new Error('Not implemented')
	}

	getMovement() {
		throw new Error('Not implemented')
	}
}