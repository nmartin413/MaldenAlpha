


var tivo = require('../tivo');

module.exports = function (app) {

	app.post('/tivo', function (req, res) {
		var command = req.param('command');

		tivo.sendCommand(command)
			.fail(function (err) {
				res.json({
					msg: 'Error with TiVo',
					err: err
				});
			})
			.then(function (response) {
				res.json({ 
					msg:'sent ' + num,
					response: response
				});
			});
			
	});

	app.get('/tivo/channel', function (req, res) {
		var num = req.param('number');

		tivo.setChannel(num)
			.fail(function (err) {
				res.json({
					msg: 'Error with TiVo',
					err: err
				});
			})
			.then(function () {
				res.json({ 
					msg:'change to num ' + num 
				});
			})

	});


}