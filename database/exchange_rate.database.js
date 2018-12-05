var sequelize = require("./../dbconnection");
var exchange_rate = sequelize.import(
  __dirname + "/../models/exchange_rate.model"
);

exchange_rate.sync().then(() => {
  exchange_rate.bulkCreate([
    {
      currency_from: "USD",
      currency_to: "EUR"
    },{
      currency_from: "USD",
      currency_to: "AUD"
    },{
      currency_from: "GBP",
      currency_to: "USD"
    }, {
      currency_from: "USD",
      currency_to: "GBP"
    }, {
      currency_from: "USD",
      currency_to: "IDR"
    }, {
      currency_from: "JPY",
      currency_to: "IDR" 
    }   
  ]);
});
