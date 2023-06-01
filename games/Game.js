
export default class Game {
	
	drawBoard() {
		throw new Error('Not implemented')
	}

	generateBoard() {
		throw new Error('Not implemented')
	}

	validate(move) {
		throw new Error('Not implemented')
	}

	apply(move, player) {
		throw new Error('Not implemented')
	}

	undoMove(move) {
		throw new Error('Not implemented')
	}

	getScore() {
		throw new Error('Not implemented')
	}

	gameFinished() {
		// Check if there is a winner
		let winner = this.getWinner();
		if (winner !== null) return {finished: true, winner: winner};
		// Check if there is a draw
		if (this.isDraw()) return {finished: true, winner: null};
		// The game is not finished
		return {finished: false, winner: null};
	}

	getWinner() {
		throw new Error('Not Implemented')
	}
	
	isDraw() {
		throw new Error('Not Implemented')
	}

}