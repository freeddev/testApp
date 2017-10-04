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
				//questionList[i].answerList.push(answerList[j].idquestion)
			}
		}
	}

	for(let i = 0; i < questionList.length; i++){
		questionList[i].theme = ''
		console.log(themequestion[i]);
		if (questionList[i].idquestion === themequestion[i].idthemequestion) {
			questionList[i].theme = themequestion[i].title;
		}
		
	}

	
	res.json(questionList);
	
})




module.exports = router;




/*// Get all questions
router.get('/questions', function (req, res, next) {
	db.questions.find(function(err, questions){
		if(err) res.send(err);

		res.json(questions);
	})
});

//Get single question
router.get('/question/:id', function (req, res, next) {
	db.questions.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, question){
		if(err) res.send(err);

		res.json(question);
	})
});

// Save Question
router.post('/question', function(req, res, next){
	var question = req.body;
	// TODO: Создать новый вопрос
})

// Delete question
router.delete('/question/:id', function (req, res, next) {
	db.questions.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, question){
		if(err) res.send(err);

		res.json(question);
	})
});

// Update question
router.put('/question/:id', function (req, res, next) {
	var question = req.body;
	var updQuestion = {};

	// TODO: Обновить вопрос


	if(updQuestion){
		db.questions.update({_id: mongojs.ObjectId(req.params.id)}, updQuestion, {}, function(err, question){
		if(err) res.send(err);

			res.json(question);
		});
	}else{
		res.status(400);
		res.json({
			"error": "Bad Data"
		})
	}

	
});*/

