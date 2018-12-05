var express = require("express"),
  sequelize = require("../dbconnection");
var Op = sequelize.Op;

// take the model
var exchange_rate = sequelize.import("../models/exchange_rate.model");
var history = sequelize.import("../models/history.model");

// define the relationship model
history.belongsTo(exchange_rate, { foreignKey: "fk_exchange_rate" });

class Users {
  constructor() {}

  IsDateValid(date) {
    var check = date.split("-");
    var newDate;
    if(check.length == 3 && check[0].length == 4 && check[1].length == 2 && check[2].length == 2) {
        newDate = new Date(check[0], check[1]-1, check[2]); // month start from 0
        if(newDate.getFullYear() == check[0] && newDate.getMonth() == check[1]-1 && newDate.getDate() == check[2]) {
            return true;
        }
    }
    return false
  }
  listExchangeRate(req, res){// method for get all exchange rate combination
    exchange_rate.findAll()
    .then(result=>{
      res.status(200).json({status: true, message: "get all combination exchange rates succeed", data: result})
    }).catch(err=>{
      res.status(500).json({status: false, message: "Somthing wrong when retrieving data", err: err});
    })
  }

  // USE CASE INPUT DAILY EXHCHANGE RATE
  inputExchangeRate(req, res) {
    const { date, from, to, rate } = req.body;

    if (!date || !from || !to || !rate) {
      res.status(400).send({ status: false, message: "invalid request" });
    } else {
      // look up for the exchange combination
      exchange_rate
        .findOne({
          where: {
            currency_from: from,
            currency_to: to
          }
        })
        .then(result => {
          if (!result) {
            res.status(204).json({ status: false, message: "no exchange rate entry" });
          } else {
            // check if the daily input for specified exchange rate is already exist
            history
              .findOne({
                where: {
                  date: date
                }
              })
              .then(entry => {
                if (!entry) {
                  // we good to go here
                  // Create new entry
                  history
                    .create({
                      rate: rate,
                      fk_exchange_rate: result.id,
                      date: date
                    })
                    .then(() => {
                      res.status(200).json({
                        status: true,
                        message: "Entry daily exchange rate succeed"
                      });
                    })
                    .catch(err => {
                      res.status(500).json({
                        status: false,
                        message: "Something Wrong when create new entry",
                        err: err
                      });
                    });
                } else {
                  res.status(409).json({
                    status: false,
                    message: "daily exchange entry for " + from + " to " + to + " at date " + date + " is already exist"
                  });
                }
              })
              .catch(err => {
                res.status(500).json({
                  status: false,
                  message: "Something wrong when find history of daily input",
                  err: err
                });
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            status: false,
            message: "Something wrong when finding the exchange rate",
            err: err
          });
        });
    }
  }
  // USE CASE ADD NEW EXCHANGE RATE COMBINATION
  addExchangeRate(req, res) {
    const { from, to } = req.body;
    if (!from || !to) {
      res.status(400).send({ status: false, message: "invalid request" });
    } else {
      // check if the exchange rate already exist
      exchange_rate
        .findOne({
          where: {
            currency_from: from,
            currency_to: to
          }
        })
        .then(result => {
          console.log(result);
          if (!result) {
            // there is no entry yet
            exchange_rate
              .create({
                currency_from: from,
                currency_to: to
              })
              .then(result => {
                res.status(200).json({ status: true, message: "Add exhange rate succeed" });
              });
          } else {
            res.status(409).json({ status: true, message: "exchange rate already exist" });
          }
        })
        .catch(err => {
          res.status(500).json({
            status: false,
            message: "Somthing wrong when get the existed entry of exchagne rate",
            err: err
          });
        });
    }
  }
  // USE CASE REMOVE EXISTING EXCHANGE RATE COMBINATION, still have problem if id there is data in history
  rmExchangeRate(req, res) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ status: true, message: "Invalid request, no id specified" });
    } else {
      // check the data if it is exist
      exchange_rate
        .findOne({
          where: {
            id: id
          }
        })
        .then(result => {
          if (!result) {
            res.status(200).json({ status: false, message: "no entry data found" });
          } else {
            // remove record
            exchange_rate
              .destroy({
                where: {
                  id: id
                }
              })
              .then(() => {
                res.status(200).json({
                  status: true,
                  message: "Remove Exchange rate succeed"
                });
              })
              .catch(err => {
                res.status(500).json({
                  status: false,
                  message: "Something wrong! cannot removing the data",
                  err: err
                });
              });
          }
        })
        .catch(err => {
          res.status(500),
            json({
              status: false,
              message: "Something wrong when find the entry",
              err: err
            });
        });
    }
  }

  // USE CASE GET ALL LIST WITH RATES AND VARIANCE
  getAllExchangeRate(req, res) {
    const date = req.params.date;

    if (!date || !this.IsDateValid(date)) {
      res.status(400).json({ status: false, message: "Invalid request" });
    } else {
      //get all exchange rate list
      this.getListExRate().then(datas => {
        datas.forEach((eachData, index) => {
          // get and add the rate field to the data
          this.get7DaysRateAverage(eachData, date).then(rateAvg =>{
            console.log(rateAvg);
            eachData.rate = rateAvg.rate;
            eachData.avg = rateAvg.avg;
            if (index == datas.length - 1) {
              results(datas); // call the callback function to terminate the loop
            }
          }).catch(err=>{
            callError(err);
          })
        });

        //callback
        const callError = err =>{
          res.status(500).json({status: false, message: "Something Wrong when get 7 days history data", err: err})
        }
        const results = data =>{
          res.status(200).json({status: true, message: "Get All Exchange rates with 7 days avg suceed", data: data})
        }

      });
    }
  }

  get7DaysRateAverage(data, date) {
    console.log('data masuk',  data);
    // get the avg
    return new Promise((resolve, reject) => {
      // check if data has last 7 days
      history
        .findAll({
          order: [['date', 'DESC']],
          where: {
            date: {
              [Op.lte]: new Date(date),
              [Op.gt]: new Date(date) - 7 * 24 * 60 * 60 * 1000
            }
          },
          include: [
            {
              model: exchange_rate,
              where: {
                id: data.id
              }
            }
          ]
        })
        .then(log => {
          console.log('log', log.length);
          let rateAvg = {rate: null, avg: null} 
          if (log == null || log == 0 || log.length < 7) {
            resolve(rateAvg);
          } else {
            // here we goes
            // get the avg and rates
            let rates = log.map(entry => entry.rate)
            rateAvg.rate = log.map(entry => entry.rate )[0] // get the newest rate;;
            rateAvg.avg = rates.reduce(function(a,b){ return a+b}) / rates.length;
            resolve(rateAvg)
          }
        }).catch(err=>{
          reject(err);
        })
    });
  }  
  getLatestRateByExchangeRate(data) {
    // return latest rate for a specified exchange rate
    return new Promise(resolve => {
      history
        .findAll({
          limit: 1,
          order: [["date", "DESC"]],
          where: {
            id: data.id
          }
        })
        .then(entry => {
          let rate = entry.map(entry => entry.rate);
          if (rate.length) {
            resolve(rate[0]);
          } else {
            resolve(null);
          }
        });
    });
  }
  getListExRate() {
    // get all exchange rates that exist in db
    return new Promise(resolve => {
      exchange_rate.findAll().then(result => {
        let datas = [];

        result.forEach(data => {
          let temp = {
            id: data.id,
            from: data.currency_from,
            to: data.currency_to
          };
          datas.push(temp);
        });
        resolve(datas);
      });
    });
  }
  // USE CASE USER WANTS TO SEE THE TREN OF EXCHANGE RATE FOR 7 DATA POINT
  get7DaysTrend(req, res) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ status: false, message: "Invalid request" });
    } else {
      history
        .findAll({
          limit: 7,
          order: [["date", "DESC"]],
          where: {
            fk_exchange_rate: id
          }
        })
        .then(result => {
          // make sure exchange rate has history data
          if (result.length) {
            this.getAvg(result).then(avg => {
              let variance = this.getVarianceExchangeRate(result);
              let data = { data: result, avg: avg, variance: variance };
              res.status(200).json({
                status: true,
                message: "Get trends by specified exchange rate succeed",
                data
              });
            });
          } else {
            res.status(200).json({
              status: false,
              message: "no history data for specified exchange rate"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            status: false,
            message: "Something wrong when checking history data"
          });
        });
    }
  }
  getAvg(datas) {
    return new Promise((resolve, reject) => {
      let sum = 0;
      datas.forEach((entry, index) => {
        sum += entry.rate;
        if (index == datas.length - 1) {
          resolve(sum / datas.length);
        }
      });
    });
  }
  getVarianceExchangeRate(datas) {
    // map the objext to get the array of rates only
    let rates = datas.map(data => data.rate);
    // find max & min of rates array
    let max = Math.max.apply(Math, rates);
    let min = Math.min.apply(Math, rates);
    return max - min;
  }
}

module.exports = new Users();
