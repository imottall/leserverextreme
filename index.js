var config      = require('./config.json');
var http        = require('http');
var express     = require('express');
var bodyParser 	= require('body-parser');


// Create the application
var app = express();

app.set('PORT', config.webPort);
app.set('SECRET_KEY', config.secretkey);

//
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//
app.all('*', function(req, res, next){
    console.log( req.method + " " + req.url);
    next();
});

// Middleware statische bestanden (HTML, CSS, images)
app.use(express.static(__dirname + '/public'));

// Routing with versions
app.use('/go', require('./routes/routes_login_example'));
app.use('/login', require('./routes/routes_login'));
app.use('/phone', require('./routes/routes_phone'));
app.use('/database', require('./routes/routes_database'))

// Start the server
var port = process.env.PORT || app.get('PORT');

app.listen(port, function() {
    console.log('The magic happens at http://localhost:'+ port);
});

module.exports = app;