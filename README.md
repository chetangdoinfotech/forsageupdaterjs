# forsageupdaterjs
### REQUIREMET ###
Need to create one script.. Name forsagetronPriceUpdater.js
(1) cron runs every hour. 

(2) find api to get price to top 20 cryptocurrency. 
Pls try cryptocompare api. And list of top crypto, you can get from coinmarketcap

(3) in cron script, make an api call to get USD value of all 20 crypto. 
Please make only one api call to get price of all 20 crypto. 

(4) make a table in MongoDb, to save all the usd prices of 20 crypto. 

(5) ok now in the script, first get all the prices from db. 
And compare with newly fetched prices from api call. 

(6) get average of price fluctuation by following formula

(Previous price - current price) * 100 / previous price

For all currency individually and get its average (sum of all / 20)

(7) send sc transaction to smart contract and update above fetched price in to smart contract. 

(8) update the new prices in db the one you fetched from api.

