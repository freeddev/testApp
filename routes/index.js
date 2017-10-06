var express = require('express'),
	router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index')
})
router.get('/test', ensureAuthenticated, function (req, res, next) {
	res.render('test.html')
})


function ensureAuthenticated(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}else{
		req.flash('error_msg', 'You are not logged in!');
		res.redirect('./user/login');
	}
}

module.exports = router;