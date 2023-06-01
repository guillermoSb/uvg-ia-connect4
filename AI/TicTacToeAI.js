import Agent from "./Agent.js";


export default class TicTacToeAI extends Agent {

	constructor(game) {
		super(game);
	}


	miniMax(isMax) {
		const { finished, winner } = this.game.gameFinished();
		if (finished) {
			const score = this.game.getScore();
			return score;
		}
		if (isMax) {
			let bestScore = -Infinity;
			for (let i = 0; i < 9; i++) {
				if (this.game.validate(i)) {
					this.game.apply(i, 0);
					const score = this.miniMax(false);
					this.game.undoMove(i);
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < 9; i++) {
				if (this.game.validate(i)) {
					this.game.apply(i, 1);
					const score = this.miniMax(true);
					this.game.undoMove(i);
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	}
}
