
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
		'views/volumeControlView',
		'routes/indexRoute',

	], function (Handlebars, Templates) {

		var App = window.App = Ember.Application.create({

			rootElement: '#root'
			
		});
		
		App.ApplicationController = require('controllers/applicationController');
		App.IndexController       = require('controllers/indexController');
		App.IndexRoute            = require('routes/indexRoute');
		App.VolumeControlView     = require('views/volumeControlView');

	});

});



