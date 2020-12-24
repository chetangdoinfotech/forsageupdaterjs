const tabletojson = require('tabletojson').Tabletojson;

var url = 'https://coinmarketcap.com/';
var curr = [];
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

tabletojson.convertUrl(
    url,
    function(tablesAsJson) {
        var data = tablesAsJson[0];
        console.log("DATA ::::");		
		for(var i=0;i<21;i++){
			var myObj = data[i];
			if(myObj.Name){
				console.log(i,":",myObj.Name,":",myObj.Price);			
				var ob = {};
				ob[myObj.Name.toString()] = myObj.Price;
				curr.push(ob);			
			}
			if(i==20){
				setTimeout(()=>{ 
					insertDocs(curr);						
				}, 200);
				setTimeout(()=>{
					getAverage();
				}, 200);
			}
		}
    }
);

async function insertDocs(curr){
        console.log("CURRENT PRICE::::");
        console.log(JSON.stringify(curr));
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        // dump in database
        await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("myforsg");      
          var myob = {prices: curr, timestamp: Date.now()};
          //console.log(myob);
          dbo.collection("cryptoprices").insertOne(myob, function(err, res) {
            if (err) throw err;
            console.log("Document insterted");
            db.close();
          });
        });
}


async function getAverage(){
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		var dbo = db.db("myforsg");
	  	var mysort = { timestamp: -1 };
	  	console.log("FINDING .....");
	  	dbo.collection("cryptoprices").find().sort(mysort).toArray(function(err, result) {
	    	if (err) throw err;
	    		console.log(result);
	    		db.close();
	  	});
	});
}