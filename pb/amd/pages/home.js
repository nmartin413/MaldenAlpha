

define([

	'base/view'

], function (BaseView) {
	
	return BaseView.extend({

		initView: function () {
			this.updateVolume();
		},

		events: {
			"change #volumeRange": 'updateVolume'
		},

		updateVolume: function () {
			var postiveVolume = $('#volumeRange').val();
			var displayVolume = 80 - parseInt(postiveVolume, 10);

			this.$el.find('#volumeValue').html("-" + displayVolume + ".0db");
		}

	});
	

})