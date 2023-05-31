import {Client} from './Client.js';
import Connect4 from './Connect4.js';

import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://localhost';
const port = 4000;
const userName = 'D4rthGuille';
const tournamentId = 12;


const game = new Connect4();


game.drawBoard();
play(game);



/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(game, player = 0) {
	if (game.gameFinished() === false) {
			rl.question('Next move? ', (answer) => { 
				const movement = parseInt(answer);
				if (game.validMove(movement)) {
					game.makeMove(player, movement);
					game.drawBoard();
					play(game, player === 0 ? 1 : 0);
				} else {
					console.log('Invalid move');
					play(game, player);
				}
			});
	} else {
		console.log('Game finished');
		
		game.drawBoard();
		rl.close();
	}
}