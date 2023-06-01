
import Connect4 from './games/Connect4.js';
import readline from 'readline'
import Connect4AI from './AI/Connect4AI.js';
import TicTacToe from './games/TicTacToe.js';
import TicTacToeAI from './AI/TicTacToeAI.js';

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
const ai = new TicTacToeAI(game, true);

play()


/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 0) {
	
	if (game.gameFinished().finished == false) {
		if (player === 0) {
			let bestMove = null;
			let bestScore = -Infinity;
				for (let i = 0; i < 9; i++) {
					if (game.validate(i)) {
						game.apply(i, player);
						const score = ai.miniMax(false);
						game.undoMove(i);
						if (score > bestScore) {
							bestMove = i;
							bestScore = score;
						}
					}			
			}	
			console.log('BEST SCORE', bestScore)
			game.apply(bestMove, player);
			
			play(player === 0 ? 1 : 0);
		} else {
				game.drawBoard();
				rl.question('Next move p1? ', (answer) => { 
					const movement = parseInt(answer);
					if (game.validate(movement)) {
						game.apply(movement, player);
						play(player === 0 ? 1 : 0);
					} else {
						console.log('Invalid move');
						play(player);
					}
				});	
			}

	} else {
		game.drawBoard();
		console.log('Game finished');
		rl.close();
	}
}