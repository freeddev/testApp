"use strict";
var Question = (function () {
    function Question(title, answerList, explanation, status) {
        if (status === void 0) { status = true; }
        this.title = title;
        this.answerList = answerList;
        this.explanation = explanation;
        this.status = status;
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=task.js.map