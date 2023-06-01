import Game from "./Game.js";

export default class Connect extends Game {

	playerDict = {
		0: 'X',	// max
		1: 'O'	// min
	}

	constructor(k, m, n, board = null) {
		super()
		this.k = k;
		this.m = m;
		this.n = n;
		this.boardTouched = false;
		this.generateBoard(board);
	}

	getScore() {
		let finishedGame = this.gameFinished();
		if (finishedGame.finished) {
			if (finishedGame.winner === null) return 0;
			if (finishedGame.winner === 'X') return 1000000000000000;
			if (finishedGame.winner === 'O') return -100000000000000;
		} else {
			throw new Error('Game is not finished');
		}
	}


	getWinner() {
		let winner = this.checkRows();
		if (winner !== null) return winner;
		winner = this.checkColumns();
		if (winner !== null) return winner;
		winner = this.checkDiagonals();
		if (winner !== null) return winner;
		return null;

	}

	isDraw() {
		for (let i = 0; i < this.n; i++) {
			if (this.board[0][i] === null) return false;
		}
		return true;
	}

	checkDiagonals() {
		if (this.k == 3) {
			if (this.board[0][0] != null && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
				return this.board[0][0];
			} else if (this.board[0][2] != null && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
				return this.board[0][2];
			}
		} else if (this.k == 4 && this.m == 6 && this.n == 7) {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 4; j++) {
					if (
						this.board[i][j] !== null
						&& this.board[i + 1][j + 1] == this.board[i][j]
						&& this.board[i + 2][j + 2] == this.board[i][j]
						&& this.board[i + 3][j + 3] == this.board[i][j]
					) {
						return this.board[i][j];
					}
				}
				for (let j = 6; j > 2; j--) {
					if (
						this.board[i][j] !== null
						&& this.board[i + 1][j - 1] == this.board[i][j]
						&& this.board[i + 2][j - 2] == this.board[i][j]
						&& this.board[i + 3][j - 3] == this.board[i][j]
					) {
						return this.board[i][j];
					}
					
				}
			}
		} else {
			throw new Error('Not implemented');
		}
		return null;
	}

	checkColumns() {
		for (let i = 0; i < this.n; i++) {
			let count = 0;
			let foundItem = null;
			for (let j = 0; j < this.m; j++) {
				if(this.board[j][i] !== null) {
					if (foundItem === null) {
						foundItem = this.board[j][i];
						count++;
					} else if (foundItem === this.board[j][i]) {
						count++;
					} else {
						count = 0;
						foundItem = null;
					}
				}
				if (count === this.k) return foundItem;
			}
			
		}
		return null;
	}

	checkRows() {
		for (let i = 0; i < this.m; i++) {
			let count = 0;
			let foundItem = null;
			for (let j = 0; j < this.n; j++) {
				if(this.board[i][j] !== null) {
					if (foundItem === null) {
						foundItem = this.board[i][j];
						count++;
					} else if (foundItem === this.board[i][j]) {
						count++;
					} else {
						count = 0;
						foundItem = null;
					}
				}
				if (count === this.k) return foundItem;
			}
			
		}
		return null;
	}


	/**
	 * Generates a connect game board of size m x n
	 */
	generateBoard(board = null) {
		this.board = [];
		for (let i = 0; i < this.m; i++) {
			this.board.push([]);
			for (let j = 0; j < this.n; j++) {
				this.board[i].push(null)
			}
		}
	}


	/**
	 * Validates if a move is valid
	 * @param {number} move 
	 */
	validate(move) {
		if (move < 0 || move > this.n) return false
		if (this.board[0][move] === null) return true;
		return false;
	}

	/**
	 * Applies a move to the board
	 * @param {number} move 
	 * @param {number} player 
	 */
	apply(move, player) {
		this.boardTouched = true;
		if (this.validate(move)) {
			for (let i = this.m - 1; i >= 0; i--) {
				if (this.board[i][move] === null) {
					this.board[i][move] = this.playerDict[player];
					return {x: i, y: move};
				}
			}
		}
		return null;
	}


	/**
	 * Undoes a move
	 * @param {number} move 
	 */
	undoMove(move) {
		
		this.board[move.x][move.y] = null;
	}


	/**
	 * Draws the board
	 */
	drawBoard() {
		let str = '';
		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				str += this.board[i][j] ? this.board[i][j] : ' ';
				str += '|';
			}
			str += '\n';
		}
		console.log(str);
	}
	
}
