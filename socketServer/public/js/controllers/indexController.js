

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		clientCount: "waiting...",
		volume: "???",

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