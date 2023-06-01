import Agent from "./Agent.js";
import {performance} from 'perf_hooks'

export default class ConnectAI extends Agent {
	constructor(game, player) {
		super(game);
		this.player = player;
	}


	evaluate(board) {
		let score = 0;
		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				if (board[i][j] === this.player) {
					score += this.game.n - i;
				} else if (board[i][j] !== this.player) {
					score -= this.game.n - i;
				}
			}
		}
		return score;
	}


	miniMax(isMax, alpha, beta, depth = 0) {
		const { finished, winner } = this.game.gameFinished();
		if (finished) {
			const score = this.game.getScore();
			return score;
		}
		if (depth == 9) {
			return this.evaluate(this.game.board);
		}
		if (isMax) {
			let bestScore = -Infinity;
			for (let i = 0; i < 7; i++) {
				if (this.game.validate(i)) {
					const move = this.game.apply(i, 0);
					const score = this.miniMax(false, alpha, beta, depth + 1);
					this.game.undoMove(move);
					bestScore = Math.max(score, bestScore);
					alpha = Math.max(alpha, score);
					if (beta <= alpha) {
						break;
					}
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < 7; i++) {
				if (this.game.validate(i)) {
					const move = this.game.apply(i, 1);
					const score = this.miniMax(true, alpha, beta, depth + 1);
					this.game.undoMove(move);
					bestScore = Math.min(score, bestScore);
					beta = Math.min(beta, score);
					if (beta <= alpha) {

						break;
					}
				}
			}
			return bestScore;
		}
	}
}