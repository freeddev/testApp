var express = require('express'),
	router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index')
})
router.get('/test', function (req, res, next) {
	res.render('test.html')
})

module.exports = router;