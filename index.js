const io = require('socket.io-client');


const socket = io('http://192.168.1.132:4000');





const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

socket.on('connect', function () {
	console.log('connect!')
	socket.emit('signin', {
    user_name: "guille2",
    tournament_id: 142857,
    user_role: 'player'
  });
});

socket.on('ok_signin', function(){
  console.log("Successfully signed in!");
});

socket.on('finish', function (data) {
	var gameID = data.game_id;
	var playerTurnID = data.player_turn_id;
	console.log('finished game!')
	socket.emit('player_ready', {
    tournament_id: 142857,
    player_turn_id: playerTurnID,
    game_id: gameID
  });
})


socket.on('ready', function (data) {
  var gameID = data.game_id;
	var playerTurnID = data.player_turn_id;
	var board = data.board;
	readline.question('movimiento: ', turno => {
		var movement = Number(turno)
		socket.emit('play', {
			tournament_id: 142857,
			player_turn_id: playerTurnID,
			game_id: gameID,
			board: board,
			movement
		});
	})
	
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('error', function(error) {
  console.log('Error:', error);
});

