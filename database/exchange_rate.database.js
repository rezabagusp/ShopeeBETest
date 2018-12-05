var sequelize = require("./../dbconnection");
var exchange_rate = sequelize.import(
  __dirname + "/../models/exchange_rate.model"
);

exchange_rate.sync().then(() => {
  exchange_rate.bulkCreate([
    {
      currencry_from: "USD",
      currency_to: "EUR"
    },
    {
      currencry_from: "USD",
      currency_to: "AUD"
    }
  ]);
});
