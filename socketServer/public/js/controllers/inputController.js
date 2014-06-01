

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		init: function () {
			console.log("init input controller");

			this._super();
		},

		actions: {
			
			denonCommand: function (command) {
				Stream.denon(command);
				return false;
			}

		}

	});

});