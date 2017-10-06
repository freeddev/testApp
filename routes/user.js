var express = require('express'),
	User = require('../models/user'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	router = express.Router();

router.get('/register', function (req, res, next) {
	res.render('register')
})
router.get('/login', function (req, res, next) {
	res.render('login')
})
router.post('/register', function (req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else{
		var newUser = new User(
			name,
			email,
			username,
			password
		);

		User.createUser(newUser, function(err, user){
			if (err) { throw err; }
			console.log(user)
		});

		req.flash('success_msg', 'You are registered');
		res.redirect('login');
	}
})



router.get('/logout', function(req, res, next){
	req.logout();
	req.flash('success_msg', 'You are logged out.');
	res.redirect('./login')
})



passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if (!user) {
   		return done(null, false, {message: 'Unknown user.'})
   	}


   	User.comparePassword(password, user.password, function(err, isMatch){
   		if (err) {throw err;}

   		return (isMatch) ? done(null, user) : done(null, false, {message: 'Invalid password'});
   	})
   });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.iduser);
});

passport.deserializeUser(function(id, done) {
	console.log(id)
  User.getUserByid(id, function(err, user) {
  	console.log(user)
    done(err, user);
  });
});



router.post('/login', passport.authenticate('local', { successRedirect: '/', 
													failureRedirect: './login', 
													failureFlash: true}), function(req, res){
	res.redirect('/');
});


module.exports = router;