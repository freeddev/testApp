var express = require('express'),
	router = express.Router(),
	mongojs = require('mongojs')
	db = mongojs('mongodb://freedbrd:go56woi123@ds157964.mlab.com:57964/testprjdb', ['questions']);

// Get all questions
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

	
});

module.exports = router;