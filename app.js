
/**
 * Module dependencies.
 */

var express = require('express');
var map = require('map');

var app = module.exports = express.createServer(), io = require('socket.io').listen(app);


function testData()
{
	var x = Math.floor(Math.random()*11);
	var y = Math.floor(Math.random()*11);
	
	return { X: x, Y: y };
}



// WebSockets

io.sockets.on('connection', function(socket)
{
	//TODO: Build opcode/action handler
	
	//Validate the client here as well
	
	socket.on('test', function()
	{
		socket.emit('response', testData());	
	});
		
	socket.on('disconnect', function()
	{
		// Client has left the buidling. Let's throw a fucking party.
	});
});

// Express Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

map.LoadMap("map/map.cmm", function(MapPacket)
{
	console.log("Map loaded; size is (%d, %s).", MapPacket.W, MapPacket.H);
});
