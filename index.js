
import readline from 'readline'
import Connect from './games/Connect.js';
import ConnectAI from './AI/ConnectAI.js';
import Client from './client.js';
import { performance } from 'perf_hooks';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://localhost';
const port = 4000;
const userName = 'Guille2';
const tournamentId = 142857;

const client = new Client(url, port, userName, tournamentId);
// const game = new Connect(4, 6, 7);



// play()


/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 1) {
	
	if (game.gameFinished().finished == false) {
		if (player === 1) {
			const ai = new ConnectAI(game, player, player == 1 ? 2 : 1);
			const startTime = performance.now();
			const move = ai.getMovement();
			const endTime = performance.now();
			console.log('Time: ', endTime - startTime);
			game.apply(move, player);
			play(player === 1 ? 2 : 1);
		} else {
				game.drawBoard();
				const ai = new ConnectAI(game, player, player == 1 ? 2 : 1);
				const startTime = performance.now();
				const move = ai.getMovement();
				const endTime = performance.now();
				console.log('Time: ', endTime - startTime);
				game.apply(move, player);
				play(player === 1 ? 2 : 1);
			}

	} else {
		console.log(game.gameFinished().winner)
		game.drawBoard();
		console.log('Game finished');
		rl.close();
	}
}