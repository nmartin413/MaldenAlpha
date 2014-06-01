

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		channels: [
			{ name: 'HBO', number: 700 },
			{ name: 'MSNBC', number: 652 },
			{ name: 'CNN', number: 650 },
			{ name: 'ESPN', number: 681 },
			{ name: 'ABC', number: 607 },
			{ name: 'NBC', number: 605 },
			{ name: 'CBS', number: 602 },
			{ name: 'PBS', number: 611 }
		],

		actions: {
			
			goToChannel: function (channel) {
				Stream.tivoChannel(channel);
				return false;
			}

		}

	});

});