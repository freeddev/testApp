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

var questionList = [];
var answerList = [];
var themequestion = [];

connection.query('Select * from question', function(err, questions, fields){
	if (err) {res.send(err)}
	questionList = questions;
});

connection.query('Select * from answer', function(err, answers, fields){
	if (err) {res.send(err)}
	answerList = answers;
});

connection.query('Select * from themequestion', function(err, theme, fields){
	if (err) {res.send(err)}
	themequestion = theme;
});

router.get('/question', function(req, res, next){
	
	for(let i = 0; i < questionList.length; i++){
		questionList[i].answerList = [];
		for(let j = 0; j < answerList.length; j++){

			if (questionList[i].idquestion === answerList[j].idquestion) {
				questionList[i].answerList.push(answerList[j]);
			}
		}
	}

	for(let i = 0; i < questionList.length; i++){
		questionList[i].theme = ''
		if (questionList[i].idquestion === themequestion[i].idthemequestion) {
			questionList[i].theme = themequestion[i].title;
		}
		
	}

	
	res.json(questionList);
	
})




module.exports = router;
