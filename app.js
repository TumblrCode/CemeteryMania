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
	httprequest = require('request'),
	cm = require('cm-gamecore'),
	redisStore = require('connect-redis')(express);
	
var app = module.exports = express.createServer(), 	
	io = require('socket.io').listen(app), 
	redis_client = redis.createClient(),
	sessionStore = new redisStore({ client: redis_client });

var parseCookie = require('connect').utils.parseCookie
var Session = require('connect').middleware.session.Session;

// Redis
//redis_client.auth("PASSWORD");

redis_client.on("error", function(err)
{
	console.log("RedisError: " + err);
});

// Express Configuration

app.configure(function()
{
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "CM Secret!", key: "cm.sid", store: sessionStore }));
  app.use(express['static'](__dirname + '/public'));
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
var fb_secret = "adca435e190332aa685d52e07b280a7e";


facebookRequest.secret = fb_secret;

// Login via facebook
app.post('/', function(req, res)
{
	// Handle inital FB post request
	var signedRequest = new facebookRequest(req.body.signed_request);
	signedRequest.parse(function(error, request)
	{
		if(request.isValid())
		{
			// Do some fancy authentication here. Should eventually make some kind of token based auth
			if(typeof request.data.oauth_token === 'string')
			{
				req.session.userid = request.data.user_id;
				
				// Check if user exists
				redis_client.hget("users:" + req.session.userid, "id", function (err, reply)
				{
				    if(reply !== req.session.userid)
				    {
				    	// New User
						httprequest("https://graph.facebook.com/" + request.data.user_id + "?access_token=" + request.data.oauth_token, function(err, response, body)
						{ 
							user_data = JSON.parse(body); 			
							redis_client.hmset("users:" + req.session.userid, user_data); 
							req.session.name = user_data.first_name + " " + user_data.last_name;
							req.session.username = user_data.username;
							req.session.auth = true;
							req.session.save();
							console.log("New User: " + req.session.userid);
							// Redirect to the actual game
							res.redirect('/game');
						});				    	
				    }
				    else
				    {
				    	// Existing User
				    	redis_client.hgetall("users:" + req.session.userid, function(err, reply)
				    	{
							req.session.name = reply.first_name + " " + reply.last_name;
							req.session.username = reply.username;
							req.session.auth = true;
							req.session.save();
							console.log("Existing User: " + req.session.userid);				    	
					    	res.redirect('/game');	
				    	});				    	
				    }
				});
			}
			else
				res.render('auth.jade');
		}
		else
			console.log(error);	
	});
});

// Direct connection
app.get('/', function(req, res)
{
	req.session.userid = "dev_00";
	req.session.username = "developer"
	req.session.name = "Dev Player";
	req.session.auth = "DEV";
	req.session.save();
	console.log("Dev User");
	// Redirect to the actual game
	res.redirect('/game');	
});

// Websockets


io.set('authorization', function(data, accept)
{
	if(data.headers.cookie)
	{
		data.cookie = parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['cm.sid'];
        data.sessionStore = sessionStore;
        sessionStore.get(data.sessionID, function(err, session)
        {
        	if(session && !err)
        	{
        		data.session = new Session(data, session);
        		return accept(null , true);
        	}
        	else
        		return accept("No session exists for this cookie", false);
        });	
	}
	else
	{
		// No Cookies
		accept("No cookies sent", false);
	}
});

var chat = io.of('/chat').on('connection', function(socket)
{
	// Update the session on connect/refresh/heartbeat
	socket.handshake.session.reload(function()
	{
		socket.handshake.session.touch().save();
	});
	socket.broadcast.emit('chat-player-connect', { from: "server", message: socket.handshake.session.username + " connected :)" });
    
    // Socket events		
	socket.on('disconnect', function()
	{
		socket.broadcast.emit('chat-player-disconnect', { from: "server", message: socket.handshake.session.username + " disconnected :(" });
	});
	
	socket.on('server-send-message', function(data)
	{
		socket.broadcast.emit('client-send-message', {from: socket.handshake.session.username , message: data.message.replace(/(<([^>]+)>)/ig,"") });
	});	
});

var game = io.of('/game').on('connection', function(socket)
{
	// Connection
	cm.playerConnect( { userID : socket.handshake.session.userid }, function(result)
	{
		if(typeof result === 'object' && result.action === undefined)
		{
			result.action = "playerConnect";
		}
		socket.emit('server-packet', result);
	});
	
	// Disconnection
	socket.on('disconnect', function(data)
	{	
		cm.playerDisconnect( { userID : socket.handshake.session.userid }, function(result)
		{
			if(typeof result === 'object' && result.action === undefined)
				result.action = "playerDisconnect";
			
			socket.emit('server-packet', result);
		});
	})	
	
	// Handle any incoming game packets
	socket.on('client-packet', function(data)
	{
		if(socket.handshake.session.userid !== 'dev_00')
		{
			try
			{
				// Setup a callback to return the result to the client
				var callback = function(result)
				{
					if(typeof result === 'object' && result.action === undefined)
						result.action = data.action;
					
					socket.emit('server-packet', result);
				}
				
				// Fire the needed event
				if(typeof cm[data.action] === 'function')
					cm[data.action](data.data, callback);
				else
					socket.emit('server-packet', { exception : "Bad Action" } );			
			}
			catch(err)
			{
				// Most likely a bad action
				console.log(err)
			}
		}
		else
			socket.emit('server-dev-packet', { data : "This is a dev account" } );	
	});
	
});


app.configure('development', function()
{
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

io.configure('development', function()
{
	io.set('log level', 1);
});

app.configure('production', function()
{
  app.use(express.errorHandler());
});

io.configure('production', function()
{
	io.set('log level', 1);
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Map data

map.LoadMap("map/map.cmm", function(MapPacket)
{
	console.log("Map loaded; size is (%d, %s).", MapPacket.W, MapPacket.H);
});

cm.hello();
