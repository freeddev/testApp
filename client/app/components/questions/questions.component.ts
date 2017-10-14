import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../../services/question.sercive";

import { Question } from '../../../question';
import { Answer } from '../../../answer';

@Component({
	moduleId: module.id,
	selector: 'test',
	templateUrl: 'questions.component.html'
})
export class QuestionsComponent implements OnInit{


	questionList: any[];
	answerList: any[];
	currentQuestion: any;
	isFinish = false;
	statusAnswer = true;
	countTrueMark = 0;
	isWrong = false;
	answerClass = ''
	testStart = false;
	countQuestions = 0;


	startTest(){
		this.questionList.sort(this.compareRandomQuestion);


		this.currentQuestion = this.questionList[0];
		this.testStart = true;
		this.countQuestions = this.questionList.length - 1;
	}

	questionNext(index: Question){
		let position = this.questionList.indexOf(index);

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус

		this.finishTest();
		if(position < this.countQuestions)
			this.currentQuestion = this.questionList[++position]; // Следующий вопрос
	}

	checkAnswer(question:Question, answer:Answer, li:HTMLElement){
		if(this.statusAnswer ){
			let indexQuestion = this.questionList.indexOf(question);

		


			if (answer.trueAnswer) {
				
				alert('Ответ верный');

				this.trueAnswerCount(answer.trueAnswer);

				this.questionNext(question);

			}else{

				this.statusAnswer = answer.trueAnswer;
				this.isWrong = true;
			}
		}
	}

	trueAnswerCount(check: boolean){
		if(check){
			this.countTrueMark++;
		}
	}

	finishTest(){
		if (this.countQuestions === this.questionList.indexOf(this.currentQuestion)) {
			this.isFinish = !this.isFinish;
		}
		
	}
	restart(){

		this.statusAnswer = true; // обновляем статус
		this.isWrong = false; // обновляем статус
		this.countTrueMark = 0;
		this.questionList.sort(this.compareRandomQuestion);
		this.currentQuestion = this.questionList[0];
		this.isFinish = !this.isFinish;

		
	}
	compareRandomQuestion(){
		return Math.random() - 0.5;
	}
	
	constructor(private questionService: QuestionService){
	}

	ngOnInit(){

		this.questionService.getQuestions()
			.subscribe(questions => {
				this.questionList = questions;
				
			});
	}
	
}