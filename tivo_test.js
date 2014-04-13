
var stdin = process.openStdin();

var tivo = require('./tivo');

tivo.sendCommand('KEYBOARD GUIDE')
	.fail(function (err) {
		console.error(err);
	})
	.then(function (resp) {
		console.log(resp);
	})
	.finally(function () {
		process.exit();
	});