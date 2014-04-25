var media = require('../media');


module.exports = function (app) {
	
	app.get('/media', function (req, res) {
		var model = {};

		model.media = media.getMediaContent();
		console.log('got media:');
	//	console.log(model.media);
		
        res.render('media', model);

	});

	app.get('/media/open', function(req,res){
		
	});

}	
