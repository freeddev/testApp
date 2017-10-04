var express = require('express'),
	router = express.Router(),
	mysql = require('mysql'),
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'pass',
		database : 'testDB'
	});

connection.connect();

var answerList = [];


connection.query('Select * from answer', function(err, answers, fields){
	if (err) {res.send(err)}
	answerList = answers;
});


router.get('/answer', function(req, res, next){
	res.json(answerList);
	
})

module.exports = router;