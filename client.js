import io from 'socket.io-client';
import Connect4AI from './Connect4AI.js';
import Connect4 from './Connect4.js';

// 192.168.1.131

export class Client {
	/**
	 * Creates a new client
	 * @param {string} url 
	 * @param {number} port
	 * @param {userName} string
	 * @param {tournamentId} tournamentId
	 */
	constructor(url, port, userName, tournamentId) {
		this.connectionUrl = `${url}:${port}`;
		this.client = io(this.connectionUrl);
		this.games = {};
		this.userName = userName;
		this.tournamentId = tournamentId;
		this.connected = false;
		this.game = new Connect4();
		this.ai = new Connect4AI(this.game);
		this.configure();
	}
	
	
	/**
	 * Configures the client
	 */
	configure() {
		// Handle connection event
		this.client.on('connect', () => {
			console.info('Client connected to the server.');
			this.client.emit('signin', { user_name: this.userName, tournament_id: this.tournamentId ,user_role: 'player' });
		});

		// Handle disconnect event
		this.client.on('disconnect', () => {
			console.info('Client disconnected from the server.');
		});

		// Handle error event

		this.client.on('error', (error) => {
			console.error(`Error: ${error}`);
		});

		// Handle signin event
		this.client.on('ok_signin', () => {
			this.connected = true;
			console.info('Client signed in successfully.');
		}
		);

		// Handle ready event
		this.client.on('ready', (data) => {
			const gameId = data.game_id;
			const playerTurnId = data.player_turn_id;
			const board = data.board;

			// Choose movement
			// Emit the new movement
		});

		// Handle Finish Event
		this.client.on('finish', (data) => {
			console.info('Game finished.');
			this.client.emit('player_ready', { tournament_id: this.tournamentId, player_turn_id: data.player_turn_id, game_id: data.game_id });
		}
		);
	}


	
}


