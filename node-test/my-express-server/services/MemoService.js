class MemoService {
  constructor() {
    this._memos = [];
    this._memoId = 1;
  }

  createMemo(title, content) {
    if (!title || !content) {
      throw new Error('제목과 내용을 모두 입력해주세요.');
    }

    const memo = {
      id: this._memoId++,
      title,
      content,
      createdAt: new Date()
    };

    this._memos.push(memo);
    return memo;
  }

  getAllMemos() {
    return [...this._memos]; // 배열의 복사본을 반환하여 캡슐화 유지
  }

  getMemoById(id) {
    const memo = this._memos.find(memo => memo.id === id);
    
    if (!memo) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
    
    return {...memo}; // 객체의 복사본을 반환하여 캡슐화 유지
  }

  updateMemo(id, title, content) {
    const memoIndex = this._memos.findIndex(memo => memo.id === id);
    
    if (memoIndex === -1) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
    
    this._memos[memoIndex] = {
      ...this._memos[memoIndex],
      title: title || this._memos[memoIndex].title,
      content: content || this._memos[memoIndex].content,
      updatedAt: new Date()
    };
    
    return {...this._memos[memoIndex]};
  }

  deleteMemo(id) {
    const memoIndex = this._memos.findIndex(memo => memo.id === id);
    
    if (memoIndex === -1) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
    
    this._memos.splice(memoIndex, 1);
  }
}

module.exports = MemoService;