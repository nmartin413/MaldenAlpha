
var Q 		= require('q'),
	_		= require('underscore'),
	net 	= require('net');

var defaultOpts = {
	endOnResponse: false
}

module.exports.create = function (host, port, opts) {

	var opts = _.defaults((opts || {}), defaultOpts);

	var socket = new net.Socket({
		allowHalfOpen: false,
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
				if (opts.endOnResponse) {
					socket.end();
				}
			});
			socket.write(command + '\r');
			notify('waiting...');
		});
	};


	return socket;
}
