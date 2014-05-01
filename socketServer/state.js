
var DeviceSocket = require('../network/deviceSocket');
var	Backbone     = require('backbone');
var	Config       = require('../config');
var	_            = require('underscore');

var state = _.clone(Backbone.Events);
var denon = DeviceSocket.create(Config.avrAddress, 23);
var attributes = state.attributes = {};

var toJSON = state.toJSON = function () {
	return _.clone(attributes);
}

var merge = state.merge = function (obj) {
	// volume change
	if ('volume' in obj && (obj.volume !== attributes.volume)) {
		updateVolume(obj.volume);
	}

	_.extend(attributes, obj);
	return _.clone(attributes);
}

function handleVolumeResponse(resp) {
	console.log('got volume response', resp, '\n');
	var result = resp.match(/MV[0-9][0-9]/);
	if (result.length) {
		var vol = parseInt(result[0].replace('MV', ''), 10);
		merge({ volume: vol });
		state.trigger('update', 'volume', vol);
	}
}

function updateVolume(vol) {
	console.log('updating volume...');
	return denon.send('MV' + vol)
		.fail(function (err) {
			console.warn('error updating volume');
		})
		.then(handleVolumeResponse);
}

function getVolume(vol) {
	console.log('getting volume...');
	return denon.send('MV?')
		.fail(function (err) {
			console.warn('error updating volume');
		})
		.then(handleVolumeResponse);
}

var init = state.init = function () {
	getVolume();
}

module.exports = state;


