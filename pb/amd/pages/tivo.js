

define([

	'base/view'

], function (BaseView) {


	return BaseView.extend({

		events: {
			"click [data-tivo-code]": function (evt) {
				evt.preventDefault();
				if (this.$el.find('#tivoButtons').hasClass('sending')) return;

				var code = $(evt.currentTarget).data('tivoCode');
				this.sendCode('KEYBOARD ' + code);
			}
		},

		sendCode: function (code) {
			this.$el.find('#tivoButtons').addClass('sending');
			this.$el.find('#tivoStatus').text('Sending...');

			var opts = {
				url: '/tivo',
				type: 'post',
				data: JSON.stringify({ command: code })
			};

			$.ajax(opts)
				.then(_.bind(function () {
					this.$el.find('#tivoStatus').text('');
					this.$el.find('#tivoButtons').removeClass('sending');
				}, this));
		}

	});


});