
var Q = require('q'),
	codes = require('./codes'),
	punycode = require('punycode'),
	_ = require('underscore'),
	net = require('net');

var host = "10.0.1.24";
var port = 23;

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
				console.log('[denon] sending command:', command);
				client.write(command + '\r\n');
			});

			var timeout = setTimeout(function () {
				console.log('[denon] timeout');
				client.destroy();
			}, 2000);

			client.on('error', function (err) {
				console.log('[denon] error ', err);
				error = err;
				client.destroy();
			});
			 
			client.on('data', function(data) {
				console.log('[denon] got response', data);
				response = data.toString('ascii');
				client.destroy();
			});
			 
			client.on('close', function() {
				console.log('[denon] closed');
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

function setVolume(level) {
	var levelString = level.toString();
	while (levelString.length < 2) {
		levelString = "0" + levelString;
	}

	console.log('[denon] setting volume to', levelString);

	return sendCommand('MV' + levelString);
}

function setInput(input){
	var newInput = input.toString();
	
	console.log('[denon] switching input to', input);

	return sendCommand('SI' + input);
	
}

var stateParams = {

	input: {
		command: codes.switchInput.query,
		parser: function (val) {
			return val
		}
	},

	volume: {
		command: codes.masterVolume.query,
		parser: function (val) {
			return val.substr(2,2);
		}
	}
};

function getState() {
	var state = {};

	var promiseFuncs = _.map(stateParams, function (atts, name) {
		var fn = _.partial(sendCommand, atts.command);
		fn.key = name;
		fn.atts = atts;
		return fn;
	});

    return promiseFuncs.reduce(function (soFar, fn) {
        return soFar.delay(200).then(function() {
            return fn().then(function (value) {
            	state[fn.key] = fn.atts.parser(value);
            });
        });
    }, Q()).then(function () {
    	return state;
    });

}

function getInputs() {
	return _.pluck(require('./inputConfig').modes, 'name');
}



module.exports.getState = getState;
module.exports.getInputs = getInputs;

module.exports.increaseVolume = _.partial(sendCommand, codes.masterVolume.up);
module.exports.decreaseVolume = _.partial(sendCommand, codes.masterVolume.down);

module.exports.setVolume = setVolume;
module.exports.setInput = setInput;




