
import Game from './Game.js';

export default class TicTacToe extends Game {

	playerDict = {
		0: 'X',	// max
		1: 'O'	// min
	}
	
	constructor() {
		super();
		this.generateBoard();
	}

	/**
	 * Generates a tic tac toe game
	 * [[null, null, null],
	 * [null, null, null],
	 * [null, null, null]]
	 */
	generateBoard() {
		this.board = [];
		
		for (let i = 0; i < 3; i++) {
			this.board.push([]);
			for (let j = 0; j < 3; j++) {
				this.board[i].push(null)
			}
		}
	}


	/**
	 * A move is valid if the position is empty
	 * @param {number} move 
	 */
	validate(move) {
		if (move < 0 || move > 8) return false
		const x = Math.floor(move / 3);
		const y = move % 3;
		if (this.board[x][y] === null) return true;
		return false;		
	}


	/**
	 * Applies a move to the board
	 * @param {*} move 
	 * @param {*} player 
	 * @returns 
	 */
	apply(move, player) {
		if (this.validate(move)) {
			move = {x: Math.floor(move / 3), y: move % 3};
			this.board[move.x][move.y] = this.playerDict[player];
			return move;
		}
		return null;
	}


	/**
	 * Gets the score of a finished game
	 */
	getScore() {
		let finishedGame = this.gameFinished();
		if (finishedGame.finished) {
			if (finishedGame.winner === null) return 0;
			if (finishedGame.winner === 'X') return 1;
			if (finishedGame.winner === 'O') return -1;
		} else {
			throw new Error('Game is not finished');
		}
	}

	/**
	 * Checks if the game is finished
	 * @returns {boolean, number}
	 */
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
		// Check rows
		let winner = this.checkRows();
		if (winner !== false) return winner;
		// Check columns
		winner = this.checkColumns();
		if (winner !== false) return winner;
		// Check diagonals
		winner = this.checkDiagonals();
		if (winner !== false) return winner;
		// There is no winner
		return null;
	}


	isDraw() {
		for (let i = 0; i < 3; i++) {
			let row = this.board[i];
			for (let j = 0; j < 3; j++) {
				if (row[j] === null) return false;
			}
		}
		return true;
	}

	checkRows() {
		for (let i = 0; i < 3; i++) {
			let row = this.board[i];
			if (row[0] !== null && row[0] === row[1] && row[1] === row[2]) return row[0];
		}
		return false;
	}

	checkColumns() {
		for (let i = 0; i < 3; i++) {
			let column = [this.board[0][i], this.board[1][i], this.board[2][i]];
			if (column[0] !== null && column[0] === column[1] && column[1] === column[2]) return column[0];
		}
		return false;
	}

	checkDiagonals() {
		let diagonal = [this.board[0][0], this.board[1][1], this.board[2][2]];
		if (diagonal[0] !== null && diagonal[0] === diagonal[1] && diagonal[1] === diagonal[2]) return diagonal[0];
		diagonal = [this.board[0][2], this.board[1][1], this.board[2][0]];
		if (diagonal[0] !== null && diagonal[0] === diagonal[1] && diagonal[1] === diagonal[2]) return diagonal[0];
		return false;
	}

	drawBoard() {
		
		let board = '';
		for (let i = 0; i < 3; i++) {
			let row = this.board[i];
			for (let j = 0; j < 3; j++) {
				let cell = row[j];
				if (cell === null) board += ' ';
				else board += cell;
				if (j < 2) board += '|';
			}
			if (i < 2) board += '\n-----\n';
		}
		console.log(board)
	}

	undoMove(move) {
		const x = Math.floor(move / 3);
		const y = move % 3;
		this.board[x][y] = null;
	}
}