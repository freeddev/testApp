var bcrypt = require('bcryptjs'),
	mysql = require('mysql'),
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'pass',
		database : 'testDB'
	});

connection.connect();

function UserScheme(name, email, username, password) {
	this.name = name; 
	this.email = email; 
	this.username = username; 
	this.password = password;
}

var User = module.exports = UserScheme;

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        console.log(newUser );
	    });
	});
}