module.exports = {
  db: {
    exchange_rate: {
      name: "exchanges_rate_currency", // database name
      user: "root", // database user
      password: "", // database password
      options: {
        host: process.env.DATABASE_HOST|| "127.0.0.1",
        dialect: "mysql",
        pool: {
          max: 1,
          min: 0,
          idle: 10000
        },
        operatorsAliases: false,
        /*Set timezone to DB*/
        timezone: '+07:00'        
      }
    }
  }
};
