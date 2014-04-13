

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
				})
			});
			
			$('#setInput').click(function (evt) {
				$.ajax({
					url: '/denon/input',
					type: 'put',
					data: JSON.stringify({ value: $('#selectedInput').val() })
				})
			});
		},

		events: {
			"change #volumeRange": 'updateVolume',
			"change #selectedInput": 'updateInput'
		},

		updateVolume: function () {
			var postiveVolume = $('#volumeRange').val();
			var displayVolume = 80 - parseInt(postiveVolume, 10);

			this.$el.find('#volumeValue').html("-" + displayVolume + ".0db");
		},
		
		updateInput: function () {
			var selectedInput = $('#selectedInput').val();

			this.$el.find('#inputValue').html(selectedInput);
		},
		

	});
	

})