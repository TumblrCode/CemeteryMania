
/**
 * Module dependencies.
 * 
 * If Redis server is hosted elsewhere update createClient accordingly!
 *
 */

var express = require('express'), 
	redis = require('redis'), 
	map = require('map'), 
	facebookRequest = require('facebook-signed-request'), 
	httprequest = require('request');
	cm = require('cm-gamecore');
	
var app = module.exports = express.createServer(), 	
	io = require('socket.io').listen(app), 
	redis_client = redis.createClient();


// Redis
//redis_client.auth("PASSWORD");

redis_client.on("error", function(err)
{
	console.log("RedisError: " + err);
});


// Express Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "CM Secret!" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.dynamicHelpers(
  	{
	  session: function(req, res)
	  {
	    return req.session;
	  }
	});
});

// Facebook config
var fb_appID = "181403871903302";
var fb_secret = "C";

facebookRequest.secret = fb_secret;

app.post('/', function(req, res)
{
	// Handle inital FB post request
	var signedRequest = new facebookRequest(req.body.signed_request);
	signedRequest.parse(function(error, request)
	{
		if(request.isValid())
		{
			if(typeof request.data.oauth_token === 'string')
			{
				// TODO: rewrite this, but I am lazy right now. Also fix session support
				var user_data;
				httprequest("https://graph.facebook.com/" + request.data.user_id + "?access_token=" + request.data.oauth_token, function(err, response, body)
				{ 
					user_data = JSON.parse(body); 
					redis_client.set("users." + request.data.user_id + ".name", user_data.first_name + " " + user_data.last_name); 
					req.session.name = user_data.first_name + " " + user_data.last_name;
				});
				res.redirect('/');
				//res.render('index.jade');
			}
			else
				res.render('auth.jade');
		}
		else
			console.log(error);
	});
	
		
});

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

// Game Server
var game = io.of('/game').on('connection', function(socket)
{
	
	socket.on('client-request-player-data', function(data)
	{
		var authenticated = false;
		// Authenticate player
					
		var playerData = {};	
		
		if(authenticated)
			socket.emit('game-player-data', playerData);			
		else
			socket.emit('game-player-data', { exception : "AuthError"});		
	});
	
	// Handle game events here
});

// End WebSockets


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Map data

map.LoadMap("map/map.cmm", function(MapPacket)
{
	console.log("Map loaded; size is (%d, %s).", MapPacket.W, MapPacket.H);
});

cm.hello();
