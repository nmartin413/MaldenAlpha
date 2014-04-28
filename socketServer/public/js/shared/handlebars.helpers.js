

define([

	'handlebars'

], function (Handlebars) {

	Handlebars.registerHelper('glyph', function (icon) {
		return new Handlebars.SafeString('<span class="glyphicon glyphicon-' + icon + '"></span>');
	});

});