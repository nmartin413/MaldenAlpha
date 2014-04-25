

define([

	'ember',
	'stream'

], function (Ember, Stream) {

	return Ember.Controller.extend({

		greeting: "???",

		init: function () {
			console.log('init app controller');
			this.set('greeting', 'hi');
			setTimeout(_.bind(function () {
				console.log('update greeting');
				this.set('greeting', 'hello');
			}, this), 1000);
		}

	});

});