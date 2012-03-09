
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(), io = require('socket.io').listen(app);

// WebSockets

// Chat Server
var chat = io.of('/chat').on('connection', function(socket)
{
	socket.broadcast.emit('chat-player-connect', {from: "server", message: "New player connected :)"});
	
	socket.on('disconnect', function()
	{
		socket.broadcast.emit('chat-player-disconnect', {from: "server", message: "Player disconnected :("});
	});
	
	socket.on('server-send-message', function(data)
	{
		socket.broadcast.emit('client-send-message', {from: data.from.replace(/(<([^>]+)>)/ig,"") , message: data.message.replace(/(<([^>]+)>)/ig,"") });
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
