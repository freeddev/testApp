import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
	moduleId: module.id,
	selector: 'result',
	templateUrl: 'result.component.html'
})
export class ResultComponent{
	@Input() countQuestions: number;
	@Input() countTrueMark: number;

	@Output() restart = new EventEmitter();

	onRestart(): void{
		this.restart.emit();
	}
}