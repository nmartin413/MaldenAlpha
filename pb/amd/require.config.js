

requirejs.config({

	paths: {
		jquery: 'lib/jquery',
		backbone: 'lib/backbone',
		underscore: 'lib/underscore',
		hammer: 'lib/hammer',
		handlebars: 'lib/handlebars.runtime',
		q: 'lib/q'
	},

	shim: {
		handlebars: {
			exports: 'Handlebars'
		}
	}

});