
import Connect4 from './games/Connect4.js';
import readline from 'readline'
import Connect4AI from './AI/Connect4AI.js';
import TicTacToe from './games/TicTacToe.js';
import TicTacToeAI from './AI/TicTacToeAI.js';
import Connect from './games/Connect.js';
import ConnectAI from './AI/ConnectAI.js';
import {performance} from 'perf_hooks'


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://192.168.1.131';
const port = 4000;
const userName = 'Guille';
const tournamentId = 142857;

// const client = new Client(url, port, userName, tournamentId);


const game = new Connect(4,6,7)
const ai = new ConnectAI(game, game.playerDict[0]);

play()


/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 0) {
	
	if (game.gameFinished().finished == false) {
		if (player === 0) {
			const move = ai.getMove();
			
			game.apply(move, player);
			play(player === 0 ? 1 : 0);
		} else {
				game.drawBoard();
				rl.question('Next move p1? ', (answer) => { 
					const movement = parseInt(answer);
					if (game.validate(movement)) {
						game.apply(movement, player);
						play(player === 0 ? 1 : 0);
					} else {
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