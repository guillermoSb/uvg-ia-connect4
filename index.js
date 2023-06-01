
import Connect4 from './games/Connect4.js';
import readline from 'readline'
import Connect4AI from './AI/Connect4AI.js';
import TicTacToe from './games/TicTacToe.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://192.168.1.131';
const port = 4000;
const userName = 'Guille';
const tournamentId = 142857;

// const client = new Client(url, port, userName, tournamentId);


const game = new TicTacToe();
const ai = new Connect4AI(game);

game.drawBoard()
play()


/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 0) {
	
	if (game.gameFinished().finished == false) {
		if (player === 0) {
					rl.question('Next move p1? ', (answer) => { 
					const movement = parseInt(answer);
					if (game.validate(movement)) {
						game.apply(movement, player);
						game.drawBoard();
						play(player === 0 ? 1 : 0);
					} else {
						console.log('Invalid move');
						play(player);
					}
				});			
		} else {
				rl.question('Next move p1? ', (answer) => { 
					const movement = parseInt(answer);
					if (game.validate(movement)) {
						game.apply(movement, player);
						game.drawBoard();
						play(player === 0 ? 1 : 0);
					} else {
						console.log('Invalid move');
						play(player);
					}
				});	
			}

	} else {
		console.log('Game finished');
		game.drawBoard();
		rl.close();
	}
}