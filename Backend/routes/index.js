var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("./Frontend/index.html", {root: "../"}); // sending request from app.js I guess
});

module.exports = router;
