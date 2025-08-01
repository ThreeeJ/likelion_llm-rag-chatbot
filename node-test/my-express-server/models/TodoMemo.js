const Memo = require('./Memo');

class TodoMemo extends Memo {
    constructor(title, content, dueDate) {
      super(title, content);
      this.dueDate = dueDate;
      this.completed = false;
      this.type = 'todo';
    }
  
    validate() {
      super.validate();
      if (!this.dueDate) {
        throw new Error('마감일을 입력해주세요.');
      }
    }
  
    toggleComplete() {
      this.completed = !this.completed;
    }
  
    toJSON() {
      return {
        ...super.toJSON(),
        dueDate: this.dueDate,
        completed: this.completed
      };
    }
}
  
module.exports = TodoMemo;