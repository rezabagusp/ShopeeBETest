module.exports = {
  db: {
    exchange_rate: {
      name: "exchange_rate_currency", // database name
      user: "root", // database user
      password: "", // database password
      options: {
        host: "localhost",
        dialect: "mysql",
        pool: {
          max: 1,
          min: 0,
          idle: 10000
        },
        operatorsAliases: false
      }
    }
  }
};
