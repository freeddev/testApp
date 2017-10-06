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

	        connection.query("INSERT INTO users (name, login, email, password) VALUES ('"+newUser.name+"', '"+newUser.username+"', '"+newUser.email+"', '"+newUser.password+"')", function(err, rows, fields){
				if (err) {res.send(err)}
			});
	        console.log(newUser );
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = "SELECT * FROM users WHERE login = '" + username + "'";

	connection.query(query, function(err, user, fields){

		if (err) {console.log(err)}

		callback(err, user[0]);
	});
}

module.exports.getUserByid = function(id, callback){
	var query = "SELECT * FROM users WHERE iduser = " + id;

	connection.query(query, function(err, user, fields){
		if (err) {console.log(err)}

		console.log('Model mess: ' + user, id)
		callback(err, user);
	});
}

module.exports.comparePassword = function (candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
	    if (err) {throw err}
	    callback(null, isMatch);
	});
}