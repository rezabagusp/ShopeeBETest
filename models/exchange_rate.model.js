var sequelize = require("../dbconnection");

module.exports = function(sequelize, DataType) {
  return sequelize.define("exchange_rates", {
    currency_from: {
      type: DataType.STRING(3),
      validate: {
        isAlpha: true,
        isUppercase: true,
        notEmpty: true
      }
    },
    currency_to: {
      type: DataType.STRING(3),
      validate: {
        isAlpha: true,
        isUppercase: true,
        notEmpty: true
      }
    }
  });
};
