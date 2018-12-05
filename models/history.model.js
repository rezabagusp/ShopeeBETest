var sequelize = require("../dbconnection");
var exchange_rate = sequelize.import("exchange_rate.model");

module.exports = function(sequelize, DataType) {
  return sequelize.define("history", {
    rate: DataType.FLOAT,
    date: {
      type: DataType.DATEONLY,
      validate: {
        isDate: true
      }
    },
    fk_exchange_rate: {
      type: DataType.INTEGER,
      references: {
        model: exchange_rate,
        key: "id"
      }
    }
  });
};
