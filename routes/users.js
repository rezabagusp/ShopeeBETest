var express = require("express");
var router = express.Router();

// Controllers class
var Users = require("./../controller/users.controller");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Users.getCurrency(req, res);
});

router.get("/all/exchange-rate", function(req, res, next) {
  Users.listExchangeRate(req, res);
});

router.post("/input-exchange-rate", function(req, res, next) {
  Users.inputExchangeRate(req, res);
});

router.post("/add-exchange-rate", function(req, res, next) {
  Users.addExchangeRate(req, res);
});

router.delete("/rm-exchange-rate/:id", function(req, res, next) {
  Users.rmExchangeRate(req, res);
});

router.get("/get-rates/:date", function(req, res, next) {
  Users.getAllExchangeRate(req, res);
});

router.get("/trend/:id", function(req, res, next) {
  Users.get7DaysTrend(req, res);
});

module.exports = router;
