
// clear console
process.stdout.write('\u001B[2J\u001B[0;0f');

var express = require('express');
var state   = require('./state');
var tivo    = require('../tivo');

state.init();

// Express Setup

var app = express();

app.use("/", express.static(__dirname + '/public'));
app.use(express.json());

var server = app.listen(5858, function() {
    console.log('Listening on port %d', server.address().port);
});

// Socket IO Setup

var clients = [];

clients.update = function () {
	clients.forEach(function (client) {
		client.emit('data', state.toJSON());
	});
}

var io = require('socket.io').listen(server);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
	clients.push(socket);

	socket.on('update', function (data) {
		state.merge(data);
		clients.update();
	});

	socket.on('tivocommand', function (command) {
		tivo.sendCommand(command);
	});

	socket.on('disconnect', function () {
		clients.splice(clients.indexOf(socket), 1);
		state.merge({ clientCount: clients.length });
		clients.update();
	});

	state.merge({ clientCount: clients.length });
	clients.update()
});

state.on('update', function () {
	clients.update();
});


