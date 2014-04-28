
var DeviceSocket = require('../network/deviceSocket'),
	Backbone = require('backbone'),
	_ = require('underscore');

var state = _.clone(Backbone.Events);

var denon = DeviceSocket.create('10.0.1.24', 23);

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

function getVolume() {
	return denon.send('MV?').then(function (resp) {
		var result = resp.match(/MV[0-9][0-9]/);
		if (result.length) {
			var vol = parseInt(result[0].replace('MV', ''), 10);
			merge({ volume: vol });
			state.trigger('update', 'volume', vol);
		}
	});
}

function updateVolume(vol) {
	return denon.send('MV' + vol).then(function (resp) {
		var result = resp.match(/MV[0-9][0-9]/);
		if (result.length) {
			var vol = parseInt(result[0].replace('MV', ''), 10);
			merge({ volume: vol });
			state.trigger('update', 'volume', vol);
		}
	});
}

var init = state.init = function () {
	getVolume();
}

module.exports = state;