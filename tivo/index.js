

var Q = require('q'),
	DeviceSocket = require('../network/deviceSocket'),
	_ = require('underscore'),
	net = require('net');


var host = "10.0.1.2";
var port = 31339;

var device = DeviceSocket.create(host, port, 'tivo');
var commandQueue = Q.promise(function (r) { r(); });

function sendCommand(command) {
	return commandQueue.then(function () {
		commandQueue = device.send(command);
		return commandQueue;
	});
}


function setChannel(channel) {
	return sendCommand('SETCH ' + channel);
}


module.exports.sendCommand = sendCommand;
module.exports.setChannel = setChannel;


