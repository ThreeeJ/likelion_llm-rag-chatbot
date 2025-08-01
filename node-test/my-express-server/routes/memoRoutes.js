const express = require('express');
const router = express.Router();

class MemoRouter {
  constructor(memoService) {
    this.memoService = memoService;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // CREATE - 새로운 메모 생성
    this.router.post('/', this.createMemo.bind(this));

    // READ - 모든 메모 조회
    this.router.get('/', this.getAllMemos.bind(this));

    // READ - 특정 메모 조회
    this.router.get('/:id', this.getMemoById.bind(this));

    // UPDATE - 메모 수정
    this.router.put('/:id', this.updateMemo.bind(this));

    // DELETE - 메모 삭제
    this.router.delete('/:id', this.deleteMemo.bind(this));
  }

  createMemo(req, res) {
    try {
      const { type, ...data } = req.body;
      const memo = this.memoService.createMemo(type, data);
      res.status(201).json(memo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  getAllMemos(req, res) {
    const memos = this.memoService.getAllMemos();
    res.json(memos);
  }

  getMemoById(req, res) {
    try {
      const memo = this.memoService.getMemoById(parseInt(req.params.id));
      res.json(memo);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  updateMemo(req, res) {
    try {
      const { type, ...data } = req.body;
      const memo = this.memoService.updateMemo(
        parseInt(req.params.id),
        type,
        data
      );
      res.json(memo);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  deleteMemo(req, res) {
    try {
      this.memoService.deleteMemo(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  getRouter() {
    return this.router;
  }
}

module.exports = MemoRouter; 