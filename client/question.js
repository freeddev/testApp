"use strict";
var Question = (function () {
    function Question(id, title, answerList, explanation, status) {
        if (status === void 0) { status = true; }
        this.id = id;
        this.title = title;
        this.answerList = answerList;
        this.explanation = explanation;
        this.status = status;
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=question.js.map