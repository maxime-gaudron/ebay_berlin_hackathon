var express = require('express'),
app = express(),
socketio = require('socket.io'),
server = app.listen(3000),
io = socketio.listen(server),
request = require('request');
        
app.use(express.static(__dirname + '/../client'));

// API object

function ebayAPI (apiKey) {
    var key = apiKey;
    
    // Find by keywords
    this.findByKeywords = function (keywords, callback) {
        var url = "http://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + key;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keywords;
        url += "&paginationInput.entriesPerPage=3";
        
        request(url, callback);
    }
}

// Socket.IO connection
io.sockets.on('connection', function (socket) {
    
    socket.on('findByKeywords', function (name, fn) {
        api.findByKeywords('monsters',function (error, response, body) {
            if (!error && response.statusCode == 200)
                fn(body);
        });
    });
    
});

// Tests

var api = new ebayAPI("RocketIn-7272-4720-b383-82b78a2922a3");

api.findByKeywords('monsters',function (error, response, body) {
    if (!error && response.statusCode == 200)
        console.log(body)
});

