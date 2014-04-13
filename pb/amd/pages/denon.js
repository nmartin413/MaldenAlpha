

define([

	'base/view'

], function (BaseView) {
	
	return BaseView.extend({


		initView: function () {
		
		},

		events: {
			"change #volumeRange": 'updateVolume',
			"change #selectedInput": 'updateInput',
			"click #btnVolumeUp": 'increaseVolume',
			"click #btnVolumeDown": 'decreaseVolume'
		},
		
		increaseVolume: function(){
			var slider = $("#volumeRange");
			var newVolume = parseInt(slider.val()) + 1;
			slider[0].setAttribute("value", newVolume || slider.attributes("min"));
			this.updateVolume();
		},
		
		decreaseVolume: function(){
			var slider = $("#volumeRange");
			var newVolume = parseInt(slider.val()) - 1;
			slider[0].setAttribute("value", newVolume || slider.attributes("min"));
			this.updateVolume();
		},
		
		updateVolume: function () {
			var postiveVolume = $('#volumeRange').val();
			var displayVolume = 80 - parseInt(postiveVolume, 10);

			this.$el.find('#volumeValue').html("-" + displayVolume + ".0db");
			this.sendAjax({url: '/denon/volume', value: $('#volumeRange').val()});
		},
		
		updateInput: function () {
			var selectedInput = $('#selectedInput').val();

			this.$el.find('#inputValue').html(selectedInput);
			this.sendAjax({url: '/denon/input', value: $('#selectedInput').val()});
		},
		
		sendAjax: function(opts){
		
			$.ajax({
					url:  opts.url,
					type: 'put',
					data: JSON.stringify({ value: opts.value })
				})
		}
		

	});
	

})