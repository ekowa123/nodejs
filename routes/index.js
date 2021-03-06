var express = require('express');
var OS = require('os');
var jwt = require('jsonwebtoken');
var auth = require('../configs/auth');
var db = require('../configs/conn');

var router = express.Router();

var TOKEN_BOT = "845430643:AAGDRv1fRcQaEhNKLHLfPY_Ow2qPaSflbjE";
var TelegramBotClient = require('telegram-bot-client');
var client = new TelegramBotClient(TOKEN_BOT);

var SECRET_KEY = '4hm4d_4rd14nsy4h_N0d3';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { status: 200, message: 'Welcome to Carsworld Digital Indonesia.', title: 'Hello Ahmad Ardiansyah', hot: OS.hostname()  });
});

router.get('/auth/:user/:pass', function(req, res, next) {
	var userParams = req.params.user;
	var passParams = req.params.pass;

	if(!userParams) return res.json({ status: 500, message: 'Params user must be filled.'});
	if(!passParams) return res.json({ status: 500, message: 'Params pass must be filled.'});

	var token = jwt.sign({ user: userParams, pass: passParams }, SECRET_KEY, { expiresIn: 120, algorithm: 'HS384' });
	res.json({ status: 200, message: 'Ok', data: token });
	return true;
});

router.get('/me', auth.authenticate, function(req, res, next) {
	console.log(req.app.token);
	res.json({ status: 200, message: 'Ok, you are allowed'});
});

router.get('/api', function(req, res, next) {
	if(req.query.stock){
		client.sendMessage(324622115, 'Stok barang sekarang '+req.query.stock);
  	res.json({status: 200, message: 'Stok barang sekarang '+req.query.stock});
	} else {
		client.sendMessage(324622115, 'Stok barang habis');
  	res.json({status: 200, message: 'Stok barang habis'});
	}
});

router.get('/ahmad', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ahmad.'});
});

router.get('/ardi', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ardi.'});
});

router.get('/ansyah', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ansyah.'});
});

router.get('/semua', function(req, res, next) {
  res.json({status: 200, message: 'Welcome Ahmad Ardiansyah.'});
});

router.get('/ok', function(req, res, next) {
  res.json({status: 200, message: 'API OK 200.'});
});

module.exports = router;
