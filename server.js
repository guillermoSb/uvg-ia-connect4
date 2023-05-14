const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('Client connected!');
  socket.emit('message', 'Hello, client!');
});

io.listen(3000);
console.log('Server started on port 3000');
