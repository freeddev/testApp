import { Injectable } from "@angular/core";
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService{
	constructor(private http:Http ){
		console.log("Question Service Init")
	}
	getQuestions(){
		return this.http.get('http://localhost:3000/api/question')
		.map(res => res.json());
	}
}
