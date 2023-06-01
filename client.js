import io from 'socket.io-client';
import Connect from './games/Connect.js';
import ConnectAI from './AI/ConnectAI.js';
import { performance } from 'perf_hooks';

// 192.168.1.131

export default class Client {

	games = {};
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
			const board = data.board;
			const playerTurnId = data.player_turn_id;
			console.log('PLAYER TURN ID: ', playerTurnId);
			if (!Object.keys(this.games).includes(`${gameId}`)) {
				this.games[`${gameId}`] = new Connect(4, 6, 7);
			}
			this.games[`${gameId}`].board = board;
			for (let i = 0; i < 6; i++) {
				for (let j = 0; j < 7; j++) {
					if (this.games[`${gameId}`].board[i][j] == 0) {
						// replace with null
						this.games[`${gameId}`].board[i][j] = null;
					}
				}	
			}
			const ai = new ConnectAI(this.games[`${gameId}`], playerTurnId, playerTurnId == 1 ? 2 : 1);
			// Emit the new movement
			const start = performance.now();
			const movement = ai.getMovement()
			const end = performance.now();
			console.log('Time: ', end - start);
			this.games[gameId].boardTouched = true;
			this.games[gameId].apply(movement, playerTurnId);
			this.games[gameId].drawBoard();

			this.client.emit('play', {
				tournament_id: this.tournamentId,
				player_turn_id: playerTurnId,
				game_id: gameId,
				board: board,
				movement
			});
			
		});

		// Handle Finish Event
		this.client.on('finish', (data) => {
			console.info('Game finished.');
			this.client.emit('player_ready', { tournament_id: this.tournamentId, player_turn_id: data.player_turn_id, game_id: data.game_id });
		}
		);
	}


	
}


