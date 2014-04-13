

define([

	'base/view'

], function (BaseView) {
	
	return BaseView.extend({

		initView: function () {
			this.updateVolume();
			
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
		},

		events: {
			"change #volumeRange": 'updateVolume'
		},

		updateVolume: function () {
			var postiveVolume = $('#volumeRange').val();
			var displayVolume = 80 - parseInt(postiveVolume, 10);

			this.$el.find('#volumeValue').html("-" + displayVolume + ".0db");
		},
		
		

	});
	

})