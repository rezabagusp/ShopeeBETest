var sequelize = require("./../dbconnection");
var configuration = require("./../configuration");

//init connection for create the db
var Sequelize = require("sequelize");
var connection = new Sequelize("", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

/* check connection*/
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// all models
var ExchangeRate = sequelize.import(
  __dirname + "./../models/exchange_rate.model.js"
);
var History = sequelize.import(__dirname + "./../models/history.model.js");

// create table
connection
  .query("CREATE DATABASE " + configuration.db.exchange_rate.name + ";")
  .then(function(data) {
    connection
      .query("USE " + configuration.db.exchange_rate.name + ";")
      .then(function(data) {
        // sync process
        ExchangeRate.sync().then(function(result) {
          History.sync();
        });
      });
  });
