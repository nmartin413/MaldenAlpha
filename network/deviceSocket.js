
var Q 		= require('q'),
	net 	= require('net');

module.exports.create = function (host, port, name) {

	var socket = new net.Socket({
		allowHalfOpen: true,
		readable: false,
		writable: false
	});

	var connectionPromise = Q.promise(function (resolve, reject) {
		socket.once('error', reject);
		socket.connect(port, host, function () {
			socket.removeListener('error', reject);
			resolve();
		});
	});

	socket.ready = function () {
		return connectionPromise;
	}

	socket.send = function (command) {
		return Q.promise(function (resolve, reject, notify) {
			socket.once('error', reject);
			socket.once('data', function (data) {
				notify('reading...');
				socket.removeListener('error', reject);
				var str = data.toString('ascii');
				resolve(str);
			});
			socket.write(command + '\r');
			notify('waiting...');
		});
	};


	return socket;
}
