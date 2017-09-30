export class Question{
	constructor(
		public title: string,
		public answerList: {title: string, trueAnswer: boolean}[],
		public explanation: string,
		public status: boolean = true ){}
}