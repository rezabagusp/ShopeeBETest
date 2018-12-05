var sequelize = require("./../dbconnection");

// all models
var ExchangeRate = sequelize.import(
  __dirname + "./../models/exchange_rate.model.js"
);
var History = sequelize.import(__dirname + "./../models/history.model.js");

// create table
ExchangeRate.sync().then(()=>{
  History.sync();
})