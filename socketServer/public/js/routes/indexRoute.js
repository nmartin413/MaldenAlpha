

define([

	'ember'

], function (Ember) {

	return Ember.Route.extend({

		init: function () {
			console.log('init index route');
		},

		renderTemplate: function () {
			console.log('[index route] render template');
			this.render('index', {
				controller: 'index',
				outlet: 'body'
			});
		}

	})


});