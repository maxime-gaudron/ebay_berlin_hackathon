var express = require('express'),
app = express(),
socketio = require('socket.io'),
server = app.listen(3000),
io = socketio.listen(server),
$ = require('jquery');
        
app.use(express.static(__dirname + '/../client'));

// API object

function ebayAPI (apiKey) {
    var key = apiKey;
    
    // Find by keywords
    this.advancedSearch = function (keywords, maxPrice, minPrice, callback) {
        $.ajax({
            type: "POST",
            url: 'http://open.api.ebay.com/shopping?callname=FindItemsAdvanced',
            dataType: "jsonp",
            jsonp: "callbackname",
            crossDomain: true,
            data: {
                'appid': key,
                'version': '771',
                'siteid': '0',
                'requestencoding': 'JSON',
                'responseencoding': 'JSON',
                'QueryKeywords': keywords,
                'MaxEntries': '3',
                'PriceMin' : {
                    'Value' : minPrice, 
                    'CurrencyID' : 'USD'
                },
                'PriceMax' : {
                    'Value' : maxPrice, 
                    'CurrencyID' : 'USD'
                },
                'callback' : true
            },
            success: function(object) {
                console.log("call success");
                callback(object.SearchResult[0].ItemArray);
            },
            error: function(object,x,errorThrown) {
                console.log("call failure");
                callback({});
            }
        });
    }
}

// Socket.IO connection
io.sockets.on('connection', function (socket) {
    
    socket.on('findByKeywords', function (name, fn) {
        api.advancedSearch('monsters',function (error, response, body) {
            if (!error && response.statusCode == 200)
                fn(body);
        });
    });

});

// Tests

var api = new ebayAPI("RocketIn-7272-4720-b383-82b78a2922a3");

api.advancedSearch('monsters', 10, 1, function (error, response, body) {
    console.log(body)
});

