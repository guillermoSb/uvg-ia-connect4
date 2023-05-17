

/**
 * Connect4 class
 */
export default class Connect4 {
	constructor() { }
	

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
}