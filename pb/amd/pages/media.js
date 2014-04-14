

define([

	'base/view'

], function (BaseView) {


	return BaseView.extend({

		events: {
			"click [data-media-item]": 'openContent'
		},

		openContent: function(evt){
			evt.preventDefault();
			
			var opts = {};
			
			opts.url = "/media/open";
			opts.value = evt.body.val();
		},
		
		sendAjax: function(opts){
				
			$.ajax({
				url:  opts.url,
				type: 'put',
				data: JSON.stringify({ value: opts.value })
			});
			
		}
		
	});


});