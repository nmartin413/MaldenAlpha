

define([

	'ember',
	'socketio'

], function (Ember, io) {
	
	var Vent = Ember.Object.extend(Ember.Evented, {

		data: {},

		update: function (updated) {
			this.set('data', _.extend(this.get('data'), updated));
			this.trigger('update');
		}

	});

	var vent = Vent.create();

	var socket = io.connect(window.location.origin);
	vent.send = function (updates) {
		socket.emit('update', updates);
	}

	socket.on('data', function (data) {
		console.log('got socket data', data);
		vent.update(data);
	});

	return vent;

});