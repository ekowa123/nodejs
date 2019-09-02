var express = require('express');
var jwt = require('jsonwebtoken');
var auth = require('../configs/auth');
var router = express.Router();

var SECRET_KEY = '4hm4d_4rd14nsy4h_N0d3';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { status: 200, message: 'Welcome to Carsworld Digital Indonesia.', title: 'Hello Node.js' });
});

router.get('/auth/:user/:pass', function(req, res, next) {
	var userParams = req.params.user;
	var passParams = req.params.pass;

	if(!userParams) return res.json({ status: 500, message: 'Params user must be filled.'});
	if(!passParams) return res.json({ status: 500, message: 'Params pass must be filled.'});

	var token = jwt.sign(
		{ user: userParams, pass: passParams }, 
		SECRET_KEY, 
		{ expiresIn: 60, algorithm: 'HS384' }
	);

	res.json({ status: 200, message: 'Ok', data: token });
});

router.get('/me', auth.authenticate, function(req, res, next) {
	console.log(req.app.token);
	res.json({ status: 200, message: 'Ok, you are allowed'})
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

module.exports = router;
