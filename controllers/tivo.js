

var _ = require('underscore');
var tivo = require('../tivo');


function getButtonLayout() {
	var base = require('../tivo/buttonLayout');
	return _.map(base, function (row) {
		if (row.length !== 12) {
			throw new Error('Row must have exactly 12!');
		}
		return _.map(row, function (entry) {
			return { code:entry[0], text: entry[1] };

		});
	});
}


module.exports = function (app) {

	var helpers = {
			tivoBtn: function (code, text) {
				return [
					'<button data-tivo-code="',
					code,
					'" class="btn btn-default btn-block">',
					text,
					'</button>'
				].join('');
			}
	};

	app.get('/tivo', function (req, res) {
		var buttonLayout;

		try {
			buttonLayout = getButtonLayout();

		} catch (err) {
			return res.render('tivo', {
				err: err.message,
				helpers: helpers
			});
		}

		res.render('tivo', {
			buttonLayout: buttonLayout,
			helpers: helpers
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