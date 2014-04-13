

require(['pb/amd/require.config.js'], function () {

	require([

		'jquery'

	], function ($) {


		$.ajaxSetup({
			contentType: 'application/json',
			dataType: 'json'
		});

		var pathname = location.pathname;
		var pagePath = ['pages', (pathname === "/") ? '/home' : pathname].join('');

		console.log('loading page from path', pagePath);
		require([pagePath], function (Page) {
			new Page({ el: document.body });
		});


	});

});
