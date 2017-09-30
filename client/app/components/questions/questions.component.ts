import { Component } from "@angular/core";
import { QuestionService } from "../../services/question.sercive";

import { Question } from '../../../question';

@Component({
	moduleId: module.id,
	selector: 'test',
	templateUrl: 'questions.component.html'
})
export class QuestionsComponent{


	questionList: any[];
	currentQuestion: any;
	isFinish = false;
	statusAnswer = true;
	countTrueMaerk = 0;
	isWrong = false;
	answerClass = ''
	testStart = false;
	countQuestions = 0;


	startTest(){
		this.currentQuestion = this.questionList[0];
		this.testStart = true;
		this.countQuestions = this.questionList.length - 1;
	}

	questionNext(index: Question){
		let position = this.questionList.indexOf(index);

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус

		console.log(this.statusAnswer)

		this.finishTest();
		if(position < this.countQuestions)
			this.currentQuestion = this.questionList[++position]; // Следующий вопрос
	}

	checkAnswer(question:Question, answer:any, li:HTMLElement){
		if(this.statusAnswer ){
			let indexQuestion = this.questionList.indexOf(question);

		


			if (answer.trueAnswer) {
				
				alert('Ответ верный');

				this.trueAnswerCount(answer.trueAnswer);

				this.questionNext(question);

			}else{

				this.statusAnswer = answer.trueAnswer
				this.isWrong = true;
			}
		}
	}

	trueAnswerCount(check: boolean){
		if(check){
			this.countTrueMaerk++;
		}
	}

	finishTest(){
		if (this.countQuestions === this.questionList.indexOf(this.currentQuestion)) {
			console.log('finish')
			this.isFinish = !this.isFinish;
		}
		
	}
	restart(){

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус
		this.countTrueMaerk = 0;
		this.currentQuestion = this.questionList[0];
		this.isFinish = !this.isFinish;


	}
	
	constructor(private questionService: QuestionService){
		this.questionService.getQuestions()
			.subscribe(questions => {
				this.questionList = questions;
				console.log(this.questionList[0]);
				
				
			});

		console.log(typeof this.questionList);



	}


	//currentQuestion: Question = this.questionList[0];


	/*countQuestions = this.questionList.length - 1;
	isFinish = false;
	currentQuestion: Question = this.questionList[0]; // первый вопрос
	statusAnswer = true;
	countTrueMaerk = 0;
	isWrong = false;
	answerClass = ''


	questionNext(index: Question){
		let position = this.questionList.indexOf(index);

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус

		console.log(this.statusAnswer)

		this.finishTest();
		if(position < this.countQuestions)
			this.currentQuestion = this.questionList[++position]; // Следующий вопрос
	}

	checkAnswer(question:Question, answer:any, li:HTMLElement){
		if(this.statusAnswer ){
			let indexQuestion = this.questionList.indexOf(question);

		


			if (answer.trueAnswer) {
				
				alert('Ответ верный');

				this.trueAnswerCount(answer.trueAnswer);

				this.questionNext(question);

			}else{

				this.statusAnswer = answer.trueAnswer
				this.isWrong = true;
			}
		}
	}

	trueAnswerCount(check: boolean){
		if(check){
			this.countTrueMaerk++;
		}
	}

	finishTest(){
		if (this.countQuestions === this.questionList.indexOf(this.currentQuestion)) {
			console.log('finish')
			this.isFinish = !this.isFinish;
		}
		
	}
	restart(){

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус
		this.countTrueMaerk = 0;
		this.currentQuestion = this.questionList[0];
		this.isFinish = !this.isFinish;


	}*/
	
	





}