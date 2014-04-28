var net = require('net');
var Q = require('q');
var display = require('./display')
var DeviceSocket = require('../network/deviceSocket');

var device = DeviceSocket.create("10.0.1.24", 23);

var stdin = process.openStdin();
display.clear();

function promptForCommand() {
	display.prompt.get(['command'], function (err, result) {
		if (err) return console.error(err);

		display.clear();
		display.log('sending command', result.command);

		device.send(result.command)
			.progress(function (msg) {
				display.log('\t>>>', msg);
			})
			.fail(function (err) {
				display.log('err', err);
				promptForCommand();
			})
			.then(function (resp) {
				display.log('rsp\t', resp);
				promptForCommand();			
			});
	});
}

device.ready()
	.progress(display.log.bind(display))
	.then(function () {
		display.log('connected...');
		promptForCommand();
	});



