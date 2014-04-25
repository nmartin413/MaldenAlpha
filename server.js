
var express = require('express');
var app = express();

var denon = require('./denon');
var tivo = require('./tivo');
var media = require('./media');


var exphbs  = require('express3-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use("/pb", express.static(__dirname + '/pb'));
app.use(express.json());

app.get('/', function (req, res) {
	var model = {};

	denon.getState()
		.catch(function (err) {
			model.error = true;
			model.denonError = err;
			res.render('home', model);
			// res.send(500, err);
		})
		.then(function (state) {
			model.denon = state;
			res.render('home', model);
		})
});


require('./controllers/denon')(app);
require('./controllers/tivo')(app);
require('./controllers/media')(app);


var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});