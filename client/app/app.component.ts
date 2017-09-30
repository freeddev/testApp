import { Component } from '@angular/core';
import { QuestionService } from './services/question.sercive';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [QuestionService]
})
export class AppComponent{}