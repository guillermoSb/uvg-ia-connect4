import Agent from "./Agent.js";
import { performance } from 'perf_hooks'

export default class ConnectAI extends Agent {
	constructor(game, player, oponent) {
		super(game);
		this.player = player;
		this.oponent = oponent;
		this.positionMap = {}

	}


	getMovement() {
		if (!this.game.boardTouched) {
			this.game.boardTouched = true;
			return 3;
		}
		let bestMove = null;
		let bestScore = this.player == 1 ? -Infinity : Infinity;
		let winnerMove = null;
		let blockLossMove = null;
		for (let i = 0; i < 7; i++) {
			if (this.game.validate(i)) {
				// Check first that on the next move the opponent cannot win
				const move = this.game.apply(i, this.oponent);
				const { finished, winner } = this.game.gameFinished();
				if (finished && winner == this.oponent) {
					this.game.undoMove(move);
					blockLossMove = i;
					continue;
				}
				this.game.undoMove(move);
				// Check if the move is a winning move
				const move2 = this.game.apply(i, this.player);
				const { finished: finished2, winner: winner2 } = this.game.gameFinished();
				if (finished2 && winner2 == this.player) {
					this.game.undoMove(move2);
					winnerMove = i;
					break;
				}
				this.game.undoMove(move2);
			}
		}
		if (winnerMove !== null) return winnerMove;
		if (blockLossMove !== null) return blockLossMove;
		
		for (let i = 0; i < 7; i++) {
			if (this.game.validate(i)) {
				// Check first that on the next move the opponent cannot win
				const move = this.game.apply(i, this.player);
				const score = this.miniMax(this.player == 1 ? false : true, -Infinity, Infinity);
				this.game.undoMove(move);
				if (score > bestScore && this.player == 1) {	
					bestMove = i;
					bestScore = score;
				} else if (score < bestScore && this.player == 2) {
					bestMove = i;
					bestScore = score;
				}
			}
		}
		return bestMove;
	}


	evaluate(board) {
		return this.heuristic1(board);
	}

	heuristic0(board) {
	
		let score = 0;
		for (let i = 0; i < this.game.m; i++) {
			for (let j = 0; j < this.game.n; j++) {
				if (board[i][j] === this.player) {
					if (this.player == 1) {
						score += this.game.n - i;
					} else {
						score -= this.game.n - i;
					}
				} else if (board[i][j] !== this.player) {
					if (this.player == 1) {
						score -= this.game.n - i;
					} else { 
						score += this.game.n - i;
					}
				}
			}
		}
		return score;
	}

	heuristic1(board) {

		// Feature 1
		const { finished, winner } = this.game.gameFinished();
		if (finished && winner === this.player) {
			if (this.player == 1) {
				return Infinity;	
			} else {
				return -Infinity;
			}
		} else if (finished && winner !== this.player) {
			if (this.player == 1) {

				return -Infinity;
			} else {
				return Infinity;
			}
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
					if (this.player == 1) {
						return Infinity;
					} else {
						return -Infinity;
					}
				}
			} else if (count == 3 && (start == 0 || end == this.game.n - 1)) {
				// Potential win
				if (board[i][start - 1] === null || board[i][end + 1] === null) {
					if (this.player == 1) {
						return 50000;
					} else {
						return -50000;
					}
				}
			}
			if (count == 2 && (start - 1 > 0 || end + 1 < this.game.n - 2)) {
				// Potential win
				if (board[i][start - 2] === null || board[i][end + 2] === null) {
					if (this.player == 1) {
						return 900000
					} else {
						return -900000;
					}
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
				if (this.player == 1) {
					rowScore = 40000;
				} else {
					rowScore = -40000;
				}
			} else if (rowSpaces == 4) {
				if (this.player == 1) {
					rowScore = 30000;
				} else {
					rowScore = -30000;
				}
			} else if (rowSpaces == 3 && playerInRow) {
				if (this.player == 1) {
					rowScore = 20000;
				} else {
					rowScore = -20000;
				}
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
				if(this.player == 1){
					columnScore = 40000;
				} else {
					columnScore = -40000;
				}
			} else if (columnSpaces == 4) {
				if(this.player == 1){
					columnScore = 30000;
				} else {
					columnScore = -30000;
				}
			} else if (columnSpaces == 3 && playerInColumn) {
				if(this.player == 1){
					columnScore = 20000;
				} else {
					columnScore = -20000;
				}
			}
		}

		if (columnScore > 0 || rowScore > 0) {
			if (this.player == 1) {
				return Math.max(columnScore, rowScore);
			} else {
				return Math.min(columnScore, rowScore);
			}

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

		if (playerIn3Column && this.player == 1) return 200
		if (playerIn3Column && this.player != 1) return -200
		
		if (playerInColumn0Or6 && this.player == 1) return 40
		if (playerInColumn0Or6 && this.player != 1) return -40
		
		if (playerInColumn1Or5 && this.player == 1) return 70
		if (playerInColumn1Or5 && this.player != 1) return -70
		

		if (playerInColumn2Or4 && this.player == 1) return 120
		if (playerInColumn2Or4 && this.player != 1) return -120


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
		if (depth == 7) {
			let score = this.evaluate(this.game.board);
			return score
		}
		if (isMax) {
			let bestScore = -Infinity;
			for (let i = 0; i < 7; i++) {
				if (this.game.validate(i)) {
					const move = this.game.apply(i, 1);
					const score = this.miniMax(false, alpha, beta, depth + 1);
					bestScore = Math.max(score, bestScore);
					alpha = Math.max(alpha, score);
					this.game.undoMove(move);
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
					const move = this.game.apply(i, 2);
					const score = this.miniMax(true, alpha, beta, depth + 1);
					bestScore = Math.min(score, bestScore);
					beta = Math.min(beta, score);
					this.game.undoMove(move);
					if (beta <= alpha) {
						break;
					}

				}
			}
			return bestScore;
		}
	}
}