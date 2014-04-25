var prompt = require('prompt');

prompt.start();

var display = {
	prompt: prompt
};

display.log = function () {
	console.log.apply(console, arguments);
}

display.clear = function () {
	process.stdout.write('\u001B[2J\u001B[0;0f');
	process.stdout.write('Denon Test\n');
	process.stdout.write('=======================\n\n');
}



module.exports = display