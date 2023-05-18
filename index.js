import {Client} from './Client.js';
import Connect4 from './Connect4.js';

const url = 'http://localhost';
const port = 4000;
const userName = 'D4rthGuille';
const tournamentId = 12;

let connect4 = new Connect4();
connect4.makeMove(1, 6);
connect4.makeMove(0, 5);
connect4.makeMove(1, 5);

connect4.makeMove(0, 4);
connect4.makeMove(0, 4);
connect4.makeMove(1, 4);

connect4.makeMove(0, 3);
connect4.makeMove(0, 3);
connect4.makeMove(0, 3);
connect4.makeMove(0, 3);


connect4.drawBoard();
console.log(connect4.gameFinished())


