var express 			= require('express'),
	path 				= require('path'),
	bodyParser 			= require('body-parser'),
	cookieParser 		= require('cookie-parser'),
	exphbs 				= require('express-handlebars'),
	expressValidator 	= require('express-validator'),
	flash 				= require('connect-flash'),
	session 			= require('express-session'),
	passport 			= require('passport'),
	LocalStrategy		= require('passport-local').Strategy,
	index 				= require('./routes/index'),
	questions 			= require('./routes/questions'),
	user				= require('./routes/user'),
	port 				= 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set static folder
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Connect flash
app.use(flash());

// Global vars
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.use('/', index);
app.use('/api', questions);
app.use('/user', user)

// Set port

app.set('port', (process.env.PORT || port));

app.listen(app.get('port'), function () {
	console.log('Server started on port ' + app.get('port'));
})