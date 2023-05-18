import {Client} from './Client.js';
import Connect4 from './Connect4.js';

const url = 'http://localhost';
const port = 4000;
const userName = 'D4rthGuille';
const tournamentId = 12;

let connect4 = new Connect4();
connect4.makeMove(1, 0);
connect4.makeMove(1, 1);
connect4.makeMove(1, 2);
connect4.makeMove(0, 3);
connect4.drawBoard();
console.log(connect4.gameFinished())


