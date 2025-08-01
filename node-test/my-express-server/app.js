const express = require('express');
const MemoryMemoService = require('./services/MemoryMemoService');
const MemoRouter = require('./routes/memoRoutes');

const app = express();
const port = 3000;

// JSON 파싱을 위한 미들웨어 추가
app.use(express.json());

// 서비스와 라우터 초기화
const memoService = new MemoryMemoService(); // 구체적인 구현체 사용
const memoRouter = new MemoRouter(memoService);

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('안녕하세요! Express 서버에 오신 것을 환영합니다!');
});

// 메모 라우터 등록
app.use('/memos', memoRouter.getRouter());

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});