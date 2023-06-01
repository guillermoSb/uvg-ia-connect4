
import readline from 'readline'
import Connect from './games/Connect.js';
import ConnectAI from './AI/ConnectAI.js';
import Client from './client.js';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const url = 'http://localhost';
const port = 4000;
const userName = 'Guille';
const tournamentId = 142857;

const client = new Client(url, port, userName, tournamentId);
// const game = new Connect(4, 6, 7);



// play(2)


/**
 * Method to test my AI
 * @param {*} game 
 * @param {*} player 
 */
function play(player = 1) {
	
	if (game.gameFinished().finished == false) {
		if (player === 2) {
			const ai = new ConnectAI(game, player, player == 1 ? 2 : 1);
			const move = ai.getMovement();		
			game.apply(move, player);
			play(player === 1 ? 2 : 1);
		} else {
				game.drawBoard();
				rl.question(`Next move p${player}? `, (answer) => { 
					const movement = parseInt(answer);
					if (game.validate(movement)) {
						game.apply(movement, player);
						play(player === 1 ? 2 : 1);
					} else {
						play(player);
					}
				});	
			}

	} else {
		console.log(game.gameFinished().winner)
		game.drawBoard();
		console.log('Game finished');
		rl.close();
	}
}