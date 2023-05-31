

/**
 * Connect4 class
 */
export default class Connect4 {

	
	
	constructor() {
		this.generateBoard();
	}


	/**
	 * Draws the current board
	 */
	drawBoard() {
		for (let i = 0; i < 6; i++) {
			console.log(`| ${this.getStringRepresentation(this.board[i][0])} | ${this.getStringRepresentation(this.board[i][1])} | ${this.getStringRepresentation(this.board[i][2])} | ${this.getStringRepresentation(this.board[i][3])} | ${this.getStringRepresentation(this.board[i][4])} | ${this.getStringRepresentation(this.board[i][5])} | ${this.getStringRepresentation(this.board[i][6])} |`)
			console.log('-----------------------------')
			
		}
	}
	

	/**
	 * Generates a new board with null values. It will be a (6,7) matrix
	 */
	generateBoard() {
		this.board = [];
		for (let i = 0; i < 6; i++) {
			this.board.push([]);
			for (let j = 0; j < 7; j++) {
				this.board[i].push(null);
			}
		}
	}

	/**
	 * Validates if the move is valid
	 * @param {number} move 
	 */
	validMove(move) {
		// Check if the move is a number
		if (typeof move !== 'number') return false;
		// Check if the move is an integer
		if (!Number.isInteger(move)) return false;
		// Check that the number is between 0 and 6
		if (move < 0 || move > 6) return false;
		// Check that the column is not full
		if (this.board[0][move] !== null) return false;	// The first row is the top of the board
		return true;
	}

	/**
	 * Indicates that a player will make a move
	 * @param {number} player 
	 * @param {number} move 
	 */
	makeMove(player, move) {
		if (!this.validMove(move)) return null;	// Check the move is valid
		// Find the first empty cell in the column
		for (let i = 5; i >= 0; i--) {
			if (this.board[i][move] === null) {
				this.board[i][move] = player;
				break;
			}
		}
		return move;
	}

	/**
	 * Validates if the game has finished
	 */
	gameFinished() {
		// Game finishes if there is a 4 in a row, column or diagonal
		// Check rows
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 3; j++) {
				if (
					this.board[i]	// Check that the row exits
					&& this.board[i][j] !== null	// Check that the first element is not null
					&& this.board[i][j] === this.board[i][j + 1]
					&& this.board[i][j] === this.board[i][j + 2]
					&& this.board[i][j] === this.board[i][j + 3]
				) {
					return this.board[i][j];
				}
			}
		}
		// Check columns
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 3; j++) {
				if (
					this.board[j]	// Check that the column exits
					&& this.board[j][i] !== null
					&& this.board[j][i] === this.board[j + 1][i]
					&& this.board[j][i] === this.board[j + 2][i]
					&& this.board[j][i] === this.board[j + 3][i]
				) {
					return this.board[j][i];
				}
			}
		}

		// Check diagonals
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

		// Check if the board is full
		for (let i = 0; i < 7; i++) {
			if (this.board[0][i] === null) return false;	// There is still space for more moves
		}

		// There is a tie
		return null
	}

	getStringRepresentation(item) {
		if (item == 1) {
			return 'X'
		} else if (item == 0) {
			return 'O'
		}
		return ' '
	}
}