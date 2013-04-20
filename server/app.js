var express = require('express'),
app = express(),
server = app.listen(3000),
$ = require('jquery');
        
app.use(express.static(__dirname + '/../client'));

// API object

function ebayAPI (apiKey) {
    var key = apiKey;
    
    // Find by keywords
    this.advancedSearch = function (keywords, maxPrice, minPrice, callback) {
        
        // var url = 'http://open.api.ebay.com/shopping?callname=FindItemsAdvanced';
        var url = 'http://open.api.sandbox.ebay.com/shopping?callname=FindItemsAdvanced';
        
        $.ajax({
            type: "POST",
            url: url,
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
                'MaxEntries': '20',
                'PriceMin' : {
                    'Value' : minPrice, 
                    'CurrencyID' : 'USD'
                },
                'PriceMax' : {
                    'Value' : maxPrice, 
                    'CurrencyID' : 'USD'
                },
                'itemFilter' : [
                { 
                    'name' : 'ListingType',
                    'value' : 'FixedPrice'
                }
                ],
                'callback' : true
            },
            success: function(object) {
                console.log("call success");
                callback(object.SearchResult[0].ItemArray.Item);
            },
            error: function(object,x,errorThrown) {
                console.log("call failure");
                callback([]);
            }
        });
    }
}

// Tests

// Production
// var key = "RocketIn-7272-4720-b383-82b78a2922a3";
// Sandbox
var key = "RocketIn-63e8-4e8a-8603-40a0978fb82a";
var api = new ebayAPI(key);


app.get('/monsters/:query', function(req, res){

    api.advancedSearch(req.params.query, 10, 1, function (items) {

        var monsters = new Array();

        for(key in items) {
            var monster = {};
            monster.name = items[key].Title;
            monster.id = items[key].ItemID;
            monster.url = items[key].ViewItemURLForNaturalSearch;

            var timeLeft = (new Date(items[key].EndTime) - new Date()) / 1000;
            monster.hp = Math.round(timeLeft / 3600 / 24 * 2);
        
            monsters.push(monster);
        }
  
        res.end(JSON.stringify(monsters));
    });    
});