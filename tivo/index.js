

var Q            = require('q');
var DeviceSocket = require('../network/deviceSocket');
var _            = require('underscore');
var Config       = require('../config');
var net          = require('net');


var host = Config.avrAddress;
var port = 31339;

var commandQueue = Q.promise(function (r) { r(); });

	function sendCommand(command) {
		return commandQueue.then(function () {
		commandQueue = Q.promise(function (resolve, reject) {
			var response, error;

			if (!command) {
				reject('no command supplied');
			}

			var client = new net.Socket();
			client.connect(port, host, function() {
				console.log('[tivo] sending command:', command);
				client.write(command + '\r\n');
			});

			var timeout = setTimeout(function () {
				console.log('[tivo] timeout');
				client.destroy();
			}, 2000);

			client.on('error', function (err) {
				console.log('[tivo] error ', err);
				error = err;
				client.destroy();
			});
			 
			client.on('data', function(data) {
				console.log('[tivo] got response', data);
				response = data.toString('ascii');
				client.destroy();
			});
			 
			client.on('close', function() {
				console.log('[tivo] closed');
				clearTimeout(timeout);
				setTimeout(function () {
					if (error) {
						reject(error);
					} else {
						resolve(response);
					}
				}, 200);
			});

		});

			return commandQueue;
		});
	}



function setChannel(channel) {
	return sendCommand('SETCH ' + channel);
}


module.exports.sendCommand = sendCommand;
module.exports.setChannel = setChannel;


