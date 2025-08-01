const IMemoService = require('./IMemoService');
const Memo = require('../models/Memo');
const ImageMemo = require('../models/ImageMemo');
const TodoMemo = require('../models/TodoMemo');

class MemoryMemoService extends IMemoService {
  constructor() {
    super();
    this._memos = [];
    this._memoId = 1;
  }

  createMemo(type, data) {
    let memo;

    switch(type) {
      case 'image':
        memo = new ImageMemo(data.title, data.content, data.imageUrl);
        break;
      case 'todo':
        memo = new TodoMemo(data.title, data.content, data.dueDate);
        break;
      default:
        memo = new Memo(data.title, data.content);
    }

    memo.validate();    // 다양성: 각 메모 타입별로 다른 검증 로직 실행
    memo.id = this._memoId++;

    this._memos.push(memo);
    return memo.toJSON(); // 다양성: 각 메모 타입별로 다른 JSON 형식 반환
  }

  getAllMemos() {
    return [...this._memos];
  }
  
  getMemoById(id) {
    const memo = this._memos.find(memo => memo.id === id);
    if (!memo) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
    return { ...memo };
  }
  
  updateMemo(id, type, data) {
    const memoIndex = this._memos.findIndex(memo => memo.id === id);
    if (memoIndex === -1) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
  
    const oldMemo = this._memos[memoIndex];
    let updatedMemo;
  
    switch(type) {
      case 'image':
        updatedMemo = new ImageMemo(
          data.title || oldMemo.title,
          data.content || oldMemo.content,
          data.imageUrl || oldMemo.imageUrl
        );
        break;
      case 'todo':
        updatedMemo = new TodoMemo(
          data.title || oldMemo.title,
          data.content || oldMemo.content,
          data.dueDate || oldMemo.dueDate
        );
        if (data.hasOwnProperty('completed')) {
          updatedMemo.completed = data.completed;
        }
        break;
      default:
        updatedMemo = new Memo(
          data.title || oldMemo.title,
          data.content || oldMemo.content
        );
    }
  
    updatedMemo.id = id;
    updatedMemo.createdAt = oldMemo.createdAt;
    updatedMemo.validate();

    this._memos[memoIndex] = updatedMemo;
    return updatedMemo.toJSON(); 
  }
  
  deleteMemo(id) {
    const memoIndex = this._memos.findIndex(memo => memo.id === id);
    if (memoIndex === -1) {
      throw new Error('메모를 찾을 수 없습니다.');
    }
  
    this._memos.splice(memoIndex, 1);
  }
}  

module.exports = MemoryMemoService;