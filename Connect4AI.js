import {performance} from 'perf_hooks'

export default class Connect4AI {
	constructor(game, isMax = true) {
		this.game = game;
		this.isMax = isMax;
	}
	



	// Consider max is player 0 and min is player 1
	minimax(isMax, alpha, beta) {
		
		if (this.game.gameFinished() !== false) {
			return this.game.getScore();
		}
		if (isMax) {
			let bestScore = -Infinity;
			for (let i = 0; i < 7; i++) {
				// Check if the move is valid
				if (this.game.validMove(i)) {
					// Make the move
					const move = this.game.makeMove(0, i);
					let score = this.minimax(false, alpha, beta);
					this.game.undoMove(move);
					bestScore = Math.max(score, bestScore);
					 alpha = Math.max(alpha, bestScore);
					 if (beta <= alpha) {
							break; // Beta cutoff
					 }
				}
			}
			return bestScore
		} else {
			let bestScore = Infinity; 
			for (let i = 0; i < 7; i++) {
				if (this.game.validMove(i)) {
					const move = this.game.makeMove(1, i);
					let score = this.minimax(true, alpha, beta);
					this.game.undoMove(move);
					bestScore = Math.min(score, bestScore);
					beta = Math.min(beta, bestScore);
					if (beta <= alpha) {
						break; // Alpha cutoff
					}
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
		let alpha = -Infinity;
  	let beta = Infinity;
		// for (let i = 0; i < 7; i++) {
		// 	if (this.game.validMove(i)) {
		// 		const move = this.game.makeMove(0, i);
		// 		let score = this.minimax(false, alpha, beta);
		// 		this.game.undoMove(move);
		// 		if (score > bestScore) {
		// 			bestScore = score;
		// 			bestMove = i;
		// 		}
		// 		alpha = Math.max(alpha, bestScore);
		// 	}
		// }
		
		// Random movement for now
		let movement = Math.floor(Math.random() * 7);
		const endTime = performance.now();
		console.log(`Time: ${endTime - startTime} ms`);
		return movement;
	}


}