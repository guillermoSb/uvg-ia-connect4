import {performance} from 'perf_hooks'

export default class Connect4AI {
	constructor(game, isMax = true) {
		this.game = game;
		this.isMax = isMax;
	}
	



	// Consider max is player 0 and min is player 1
	minimax(isMax) {
		
		if (this.game.gameFinished() !== false) {
			return this.game.getScore();
		}
		if (isMax) {
			let bestScore = -Infinity;
			for (let i = 0; i < 7; i++) {
				// Check if the move is valid
				if (this.game.validMove(i) ) {
					// Make the move
					const move = this.game.makeMove(0, i);
					let score = this.minimax(false);
					this.game.undoMove(move);
					bestScore = Math.max(score, bestScore);					 
				}
			}
			return bestScore
		} else {
			let bestScore = Infinity; 
			for (let i = 0; i < 7; i++) {
				if (this.game.validMove(i)) {
					const move = this.game.makeMove(1, i);
					let score = this.minimax(true);
					this.game.undoMove(move);
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore
		}
	}

	getMovement() {
		console.log('AI MAKING CHOICE')
		const startTime = performance.now();
		
		let bestScore = -Infinity;
		let bestMove;

		for (let i = 0; i < 7; i++) {
			if (this.game.validMove(i)) {
				const move = this.game.makeMove(0, i);
				let score = this.minimax(false);
				this.game.undoMove(move);
				if (score > bestScore) {
					bestScore = score;
					bestMove = i;
				}

			}
		}
		
		// Random movement for now
		let movement = bestMove;
		const endTime = performance.now();
		console.log(`Time: ${endTime - startTime} ms`);
		return movement;
	}


}