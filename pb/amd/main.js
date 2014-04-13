

require(['pb/amd/require.config.js'], function () {

	require([

		'jquery'

	], function ($) {


		$.ajaxSetup({
			contentType: 'application/json',
			dataType: 'json'
		});
		
		$('#setVolume').click(function (evt) {

			$.ajax({
				url: '/denon/volume',
				type: 'put',
				data: JSON.stringify({ value: $('#volumeRange').val() })
			}).then(function () {
				document.location.href = "/";
			});

			$('body').hide();
		})

		var pathname = location.pathname;
		var pagePath = ['pages', (pathname === "/") ? '/home' : pathname].join('');

		console.log('loading page from path', pagePath);
		require([pagePath], function (Page) {
			new Page({ el: document.body });
		});


	});

});
