import Connect4 from "../Connect4";

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

	})
});