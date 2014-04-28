
require([
	
	'ember',
	'underscore'

], function (Ember, _) {
	
	window._ = _;


	require([

		'handlebars',
		'templates',
		'controllers/applicationController',
		'controllers/indexController',
		'controllers/keypadController',
		'views/volumeControlView',
		'routes/indexRoute',
		'routes/keypadRoute'

	], function (Handlebars, Templates) {

		var App = window.App = Ember.Application.create({

			rootElement: '#root'
			
		});

		App.Router.map(function () {
			this.route('keypad', { path: '/keypad' });
		});
		
		App.ApplicationController = require('controllers/applicationController');
		App.IndexController       = require('controllers/indexController');
		App.KeypadController      = require('controllers/keypadController');
		App.IndexRoute            = require('routes/indexRoute');
		App.KeypadRoute           = require('routes/keypadRoute');
		App.VolumeControlView     = require('views/volumeControlView');

	});

});



