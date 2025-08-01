const Memo = require('./Memo');

class ImageMemo extends Memo {
  constructor(title, content, imageUrl) {
    super(title, content);
    this.imageUrl = imageUrl;
    this.type = 'image';
  }

  validate() {
    super.validate();
    if (!this.imageUrl) {
      throw new Error('이미지 URL을 입력해주세요.');
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      imageUrl: this.imageUrl
    }
  }
}

module.exports = ImageMemo;