

var denon = require('../denon');


module.exports = function (app) {
	
	app.get('/denon', function (req, res) {
		var model = {};

		denon.getState()
			.catch(function (err) {
				model.error = true;
				model.denonError = err;
				res.render('denon', model);	
				// res.send(500, err);
			})
			.then(function (state) {
				model.denon = state;
				res.render('denon', model);
			})
	});

	
	app.put('/denon/volume', function (req, res) {
		var level = req.body.value;
		console.log('Setting volume to ', level);

		denon.setVolume(level)
			.catch(function (err) {
				res.send(500, err);
			})
			.then(function () { 
				res.json({ status: 'success' }); 
			});
	});

	app.put('/denon/input', function(req, res){
		var input = req.body.value;
		console.log('Setting input to ', input);
		
		denon.setInput(input)
			.catch(function (err) {
				res.send(500, err);
			}).then(function () { 
				res.json({ status: 'success' }); 
			});
	});

	app.put('/denon/toggleMute', function(req,res){
		console.log('toggling mute');
		denon.toggleMute("OFF");
		
		denon.getState()
			.catch(function (err) {
				model.error = true;
				model.denonError = err;
			})
			.then(function (state) {
				model.denon = state;
				console.log("current state" + state);
				if (state.muteStatus === "ON"){
					denon.toggleMute("OFF");
				}else{
					denon.toggleMute("ON");
				}
			});
	});
}	
