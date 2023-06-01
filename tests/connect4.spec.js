import Connect4 from "../games/Connect4.js";
import Connect from "../games/Connect.js";

describe('Connect4 Test', () => {
	let connect4;
	beforeEach(() => {
		connect4 = new Connect4();
	})
	test('Generate board', () => {		
		// Act
		connect4.generateBoard();
		// Assert
		expect(connect4.board).toEqual([
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
		])
	})

	test.each([
		[1, true],
		['a', false],
		[1.5, false],
		[100, false],
		[2, false],
	])('Validates move', (move, expectedResult) => {
		// Arrange
		connect4.board = [
			[null, null, 0, null, null, null, null],
			[null, null, 0, null, null, null, null],
			[null, null, 0, null, null, null, null],
			[null, null, 0, null, null, null, null],
			[null, null, 0, null, null, null, null],
			[null, null, 0, null, null, null, null],
		]
		// Act
		const result = connect4.validMove(move);
		// Assert
		expect(result).toBe(expectedResult);
	});

	test('Validates Winner', () => {
		// arrange
		const game = new Connect(4, 6, 7);
		// act
		game.board[5] = [null, 'O', 'O', 'X', 'X', 'X', 'X'];

		const result = game.gameFinished()
		// assert
		expect(result.finished).toBe(true);
		expect(result.winner).toBe('X')
	})


	test('Validates Winner', () => {
		// arrange
		const game = new Connect(4, 6, 7);
		// act
		game.board[5] = [null, 'O', 'X', 'O', 'X', 'X', 'O'];

		const result = game.gameFinished()
		// assert
		expect(result.finished).toBe(false);
	})

	test('Validates Winner', () => {
		// arrange
		const game = new Connect(3,3,3);
		// act
		game.board[2] = ['X','X', 'X'];

		const result = game.gameFinished()
		// assert
		expect(result.finished).toBe(true);
	})


});