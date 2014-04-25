require.config({

	paths: {
		socketio: '/socket.io/socket.io',
		underscore: 'lib/underscore/underscore',
		jquery:	'lib/jquery/dist/jquery',
		handlebars: 'lib/handlebars/handlebars',
		ember: 'lib/ember/ember',
		emberData: 'lib/ember-data/ember-data',
		emberLocalStorage: 'lib/ember-localstorage-adapter/localstorage_adapter'
	},

	shim: {
		emberLocalStorage: {
			deps: ['emberData']
		},
		socketio: {
			exports: 'io'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		'ember': {
			deps: ['jquery', 'handlebars'],
			exports: 'Ember'
		},
		'emberData': {
			deps: ['ember'],
			exports: 'DS'
		}
	}

});