// import configuration
var configuration = require("./configuration");

// import all packages
var Sequelize = require("sequelize");

// connect to database
var sequelize = new Sequelize(
  configuration.db.exchange_rate.name,
  configuration.db.exchange_rate.user,
  configuration.db.exchange_rate.password,
  configuration.db.exchange_rate.options
);

module.exports = sequelize;