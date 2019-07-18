var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({status: 200, message: 'Welcome to Carsworld Digital Indonesia.'})
});

router.get('/ahmad', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ahmad.'})
});

router.get('/ardi', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ardi.'})
});

router.get('/ansyah', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ansyah.'})
});

router.get('/bangke', function(req, res, next) {
  res.json({status: 200, message: 'Welcome bangke.'})
});

module.exports = router;
