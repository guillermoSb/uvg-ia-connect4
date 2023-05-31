import {Client} from './Client.js';
import Connect4 from './Connect4.js';

import readline from 'readline'
import Connect4AI from './Connect4AI.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://192.168.1.131';
const port = 4000;
const userName = 'Guille';
const tournamentId = 142857;

const client = new Client(url, port, userName, tournamentId);


// const game = new Connect4();
// const ai = new Connect4AI(game);



/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 0) {
	if (game.gameFinished() === false) {
		if (player === 0) {
				const movement = ai.getMovement();
				game.makeMove(player, movement);
				
				game.drawBoard();
				play(player === 0 ? 1 : 0);				
		} else {
			
				rl.question('Next move? ', (answer) => { 
					const movement = parseInt(answer);
					if (game.validMove(movement)) {
						game.makeMove(player, movement);
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