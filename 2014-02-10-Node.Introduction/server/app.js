'use strict';

var express = require('express');
var home = require('./routes/home');
var math = require('./routes/math');
var app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', home.index);
app.get('/name', home.name); //home: the JS file, name: the function in the file
//note: the function must exist or the server will fail to compile and cause lots of crap to happen
app.get('/color', home.color);
app.get('/add/:a/:b', home.add); //colons specify wildcards
//all params (things after the first slash) get passed in the first input to the specified function
app.get('/canDrink/:a/:b', home.canDrink);
app.get('/product', math.product);
app.get('/names', home.names);

var server = require('http').createServer(app);
server.listen(app.get('port'), function(){
  console.log('Node server listening. Port: ' + app.get('port'));
});

