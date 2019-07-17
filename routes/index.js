var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Ahmad Ardiansyah' });
  res.json({status: 200, message: 'Welcome to Carsworld Digital Indonesia.'})
});

router.get('/ahmad', function(req, res, next) {
  //res.render('index', { title: 'Ahmad Ardiansyah' });
  res.json({status: 200, message: 'Welcome Ahmad Ardiansyah.'})
});

module.exports = router;
