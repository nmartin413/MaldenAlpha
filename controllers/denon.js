

var denon = require('../denon');


module.exports = function (app) {
	
	app.put('/denon/volume', function (req, res) {
	var level = req.body.value;
	console.log('Setting volume to ', level);

	denon.setVolume(level)
		.catch(function (err) {
			res.send(500, err);
		})
		.then(function () { 
			res.json({ status: 'success' }); 
		})
	});

	app.get('/denon/volume/up', function (req, res) {
		denon.increaseVolume()
			.catch(function (err) {
				res.send(500, err);
			})
			.then(function () { 
				res.redirect('/'); 
			})
	});

	app.get('/denon/volume/down', function (req, res) {
		denon.decreaseVolume()
			.catch(function (err) {
				res.send(500, err);
			})
			.then(function () { 
				res.redirect('/'); 
			})
	});
	
}	
