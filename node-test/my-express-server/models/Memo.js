class Memo {
    constructor(title, content) {
      this.id = null;
      this.title = title;
      this.content = content;
      this.createdAt = new Date();
      this.type = 'basic';
    }
  
    validate() {
      if (!this.title || !this.content) {
        throw new Error('제목과 내용을 모두 입력해주세요.');
      }
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        content: this.content,
        createdAt: this.createdAt,
        type: this.type
      };
    }
}
  
module.exports = Memo;