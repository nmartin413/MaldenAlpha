
require([
	
	'ember',
	'underscore'

], function (Ember, _) {
	
	window._ = _;


	require([

		'handlebars',
		'shared/handlebars.helpers',
		'templates',
		'controllers/applicationController',
		'controllers/indexController',
		'controllers/keypadController',
		'controllers/inputController',
		'controllers/channelController',
		'views/volumeControlView',
		'routes/indexRoute',
		'routes/keypadRoute'

	], function (Handlebars, Templates) {

		var App = window.App = Ember.Application.create({

			rootElement: '#root'
			
		});

		App.Router.map(function () {
			this.route('keypad', { path: '/keypad' });
			this.route('input', { path: '/input' });
			this.route('channel', { path: '/channel' });
		});
		
		App.ApplicationController = require('controllers/applicationController');
		App.IndexController       = require('controllers/indexController');
		App.KeypadController      = require('controllers/keypadController');
		App.InputController       = require('controllers/inputController');
		App.ChannelController     = require('controllers/channelController');
		App.IndexRoute            = require('routes/indexRoute');
		App.KeypadRoute           = require('routes/keypadRoute');
		App.VolumeControlView     = require('views/volumeControlView');

	});

});



