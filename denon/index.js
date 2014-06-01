
var Q = require('q'),
	codes = require('./codes'),
	DeviceSocket = require('../network/deviceSocket'),
	_ = require('underscore'),
	Config = require('../config'),
	net = require('net');

var host = Config.avrHost;
var port = 23;

var device = DeviceSocket.create(host, port);
var commandQueue = Q.promise(function (r) { r(); });

function sendCommand(command) {
	return commandQueue.then(function () {
		commandQueue = device.send(command);
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

function toggleMute(input){
	return sendCommand('MU' + input);
}

var stateParams = {

	input: {
		command: codes.switchInput.query,
		parser: function (val) {
			return val;
		}
	},

	volume: {
		command: codes.masterVolume.query,
		parser: function (val) {
			return val.substr(2,2);
		}
	},
	
	muteStatus: {
		command: codes.muteStatus.query,
		parser: function (val) {
			return val;
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



module.exports.getState       = getState;
module.exports.getInputs      = getInputs;
module.exports.toggleMute     = toggleMute;

module.exports.increaseVolume = _.partial(sendCommand, codes.masterVolume.up);
module.exports.decreaseVolume = _.partial(sendCommand, codes.masterVolume.down);

module.exports.setVolume      = setVolume;
module.exports.setInput       = setInput;




