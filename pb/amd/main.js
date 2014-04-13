

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


		if (location.pathname === "/") {
			require(['pages/home'], function (Home) {
				new Home({ el: document.body });
			});
		}


	});

});
