import Agent from "./Agent.js";
import { performance } from 'perf_hooks'

export default class ConnectAI extends Agent {
	constructor(game, player) {
		super(game);
		this.player = player;
		this.positionMap = {}
	}


	evaluate(board) {
		return this.heuristic1(board);
	}

	heuristic0(board) {
		console.log('using h0')
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

	heuristic1(board) {

		// Feature 1
		const { finished, winner } = this.game.gameFinished();
		if (finished && winner === this.player) {
			return Infinity;
		} else if (finished && winner !== this.player) {
			return -Infinity;
		}

		// Feature 2
		let count = 0;
		let start = 0;
		let end = 0;
		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				if (board[i][j] === this.player) {
					if (count == 0) {
						start = j;
					} else {
						end = j;
					}
					count++;
				} else {
					count = 0;
				}
			}
			if (count == 3 && start > 0 && end < this.game.n - 1) {
				// Absolute win
				if (board[i][start - 1] === null && board[i][end + 1] === null) {
					return Infinity;
				}
			} else if (count == 3 && (start == 0 || end == this.game.n - 1)) {
				// Potential win
				if (board[i][start - 1] === null || board[i][end + 1] === null) {
					return 50000;
				}
			}
			if (count == 2 && (start - 1 > 0 || end + 1 < this.game.n - 2)) {
				// Potential win
				if (board[i][start - 2] === null || board[i][end + 2] === null) {
					return 900000	
				}
			}
		}
		// Feature 3
		let playerInRow = false
		let emptySpacesUntilOtherPlayer = 0;
		let prevEmptySpacesUntilOtherPlayer = 0;
		let rowScore = 0;
		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				if (board[i][j] === this.player) {
					if (emptySpacesUntilOtherPlayer > 0) {
						break;
					}
					playerInRow = true;
				} else if (board[i][j] !== this.player && board[i][j] == null) {
					emptySpacesUntilOtherPlayer++;
				} else if (board[i][j] !== this.player && board[i][j] !== null) {
					if (playerInRow) {
						rowScore += emptySpacesUntilOtherPlayer;
					}
					playerInRow = false;
					prevEmptySpacesUntilOtherPlayer = emptySpacesUntilOtherPlayer;
					emptySpacesUntilOtherPlayer = 0;
				}
			}
		}
		let rowSpaces = Math.max(prevEmptySpacesUntilOtherPlayer, emptySpacesUntilOtherPlayer);
		if (rowSpaces > 0) {
			if (rowSpaces == 5) {
				rowScore = 40000;
			} else if (rowSpaces == 4) {
				rowScore = 30000;
			} else if (rowSpaces == 3 && playerInRow) { 
				rowScore = 20000;
			}
		}

		// for columns
		let playerInColumn = false
		let emptySpacesUntilOtherPlayerColumn = 0;
		let prevEmptySpacesUntilOtherPlayerColumn = 0;
		let columnScore = 0;
		for (let j = 0; j < this.game.n; j++) {
			for (let i = 0; i < this.game.m; i++) {
				if (board[i][j] === this.player) {
					if (emptySpacesUntilOtherPlayerColumn > 0) {
						break;
					}
					playerInColumn = true;
				} else if (board[i][j] !== this.player && board[i][j] == null) {
					emptySpacesUntilOtherPlayerColumn++;
				} else if (board[i][j] !== this.player && board[i][j] !== null) {
					if (playerInColumn) {
						columnScore += emptySpacesUntilOtherPlayerColumn;
					}
					playerInColumn = false;
					prevEmptySpacesUntilOtherPlayerColumn = emptySpacesUntilOtherPlayerColumn;
					emptySpacesUntilOtherPlayerColumn = 0;
				}
			}
		}
		let columnSpaces = Math.max(prevEmptySpacesUntilOtherPlayerColumn, emptySpacesUntilOtherPlayerColumn);
		if (columnSpaces > 0) {
			if (columnSpaces == 5) {
				columnScore = 40000;
			} else if (columnSpaces == 4) {
				columnScore = 30000;
			} else if (columnSpaces == 3 && playerInColumn) { 
				columnScore = 20000;
			}
		}

		if (columnScore > 0 || rowScore > 0) {
			return Math.max(columnScore, rowScore);
		}

		// Feature 4
		let playerIn3Column = false;
		let playerInColumn0Or6 = false;
		let playerInColumn1Or5 = false;
		let playerInColumn2Or4 = false;

		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				if (board[i][j] === this.player) {
					if (j == 3) {
						playerIn3Column = true;
						break;
					}
					else if (j == 0 || j == 6) {
						playerInColumn0Or6 = true;
						break;
					} else if (j == 1 || j == 5) {
						playerInColumn1Or5 = true;
						break;
					} else if (j == 2 || j == 4) {
						playerInColumn2Or4 = true;
						break;
					}
				}
			}
		}

		if (playerIn3Column) return 200
		if (playerInColumn0Or6) return 40
		if (playerInColumn1Or5) return 70
		if (playerInColumn2Or4) return 120


		return this.heuristic0(board);



		
	}


	saveBoard(board, score) {
		const key = this.boardToString(board);
		if (Object.keys(this.positionMap).includes(key)) {
			this.positionMap[key] = score;
		} else if (Object.keys(this.positionMap).length < 10) {
			this.positionMap[key] = score;
		}
	}

	boardToString(board) {
		let key = '';
		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				key += board[i][j];
			}
		}
		return key;
	}

	miniMax(isMax, alpha, beta, depth = 0) {
		const { finished, winner } = this.game.gameFinished();
		if (finished) {
			const score = this.game.getScore();
			return score;
		}
		if (depth == 8) {
			let score = this.evaluate(this.game.board);
			return score
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