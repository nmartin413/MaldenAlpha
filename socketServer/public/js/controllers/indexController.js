

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		clientCount: "waiting...",
		volume: "???",

		displayVolume: function () {
			var vol = this.get('volume');
			if (vol == parseInt(vol, 10))
				return vol - 80;

			return "???";

		}.property('volume'),

		directionalButtons: [
			{ cmd: 'UP', icon: 'chevron-up' },
			{ cmd: 'DOWN', icon: 'chevron-down' },
			{ cmd: 'LEFT', icon: 'chevron-left' },
			{ cmd: 'RIGHT', icon: 'chevron-right' }
		],

		init: function () {
			console.log('init index controller');

			Stream.on('update', _.bind(function () {
				this.set('clientCount', Stream.get('data.clientCount'));
				this.set('volume', Stream.get('data.volume'));
			}, this));

		},

		sendUpdates: function () {
			console.log('sending updates');
			Stream.send({ volume: this.get('volume') });
			
		}.observes('volume'),

		actions: {
			tivoIRCommand: function (command) {
				Stream.tivoIR(command);
				return false;
			},
			increase: function () {
				this.incrementProperty('volume')
				return false;
			},
			decrease: function () {
				this.decrementProperty('volume')
				return false;
			}
		}

	});

});