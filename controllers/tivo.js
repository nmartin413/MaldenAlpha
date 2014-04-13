


var tivo = require('../tivo');

module.exports = function (app) {

	app.get('/tivo', function (req, res) {

		res.render('tivo', {
			buttonLayout: require('../tivo/buttonLayout')
		});

	});

	app.post('/tivo', function (req, res) {
		var command = req.body.command;

		tivo.sendCommand(command)
			.fail(function (err) {
				res.json({
					msg: 'Error with TiVo, sent ' + command,
					err: err
				});
			})
			.then(function (response) {
				res.json({ 
					msg:'Sent ' + command,
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