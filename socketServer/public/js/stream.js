

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

	vent.tivoChannel = function (channel) {
		vent.tivo("SETCH " + channel);
	}

	vent.tivoIR = function (command) {
		vent.tivo("IRCODE " + command);
	}

	vent.tivo = function (command) {
		socket.emit('tivocommand', command);
	}

	vent.denon = function (command) {
		socket.emit('denoncommand', command);
	}

	socket.on('data', function (data) {
		console.log('got socket data', data);
		vent.update(data);
	});

	return vent;

});