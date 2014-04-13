
var stdin = process.openStdin();

var tivo = require('./tivo');

tivo.sendCommand('SETCH 7')
	.fail(function (err) {
		console.error(err);
	})
	.then(function (resp) {
		console.log(resp);
	})
	.finally(function () {
		process.exit();
	});