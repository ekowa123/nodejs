// oke
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
  	status: 200,
  	message: "Congratulation, you fetch an API.",
  	result : [
  		{name: "Ahmad"},
  		{name: "Ardiansyah"}
  	]
  });
});

router.get('/debug-sentry', (req, res) => {
  throw new Error('My first Sentry error!');
});

module.exports = router;
