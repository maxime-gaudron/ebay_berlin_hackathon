var express = require('express'),
	app = express(),
        socketio = require('socket.io'),
        server = app.listen(3000),
        io = socketio.listen(server);

app.use(express.static(__dirname + '/../client'));