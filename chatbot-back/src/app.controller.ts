import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import type { ChatRequest } from './dto/ChatRequest.dto';
import { ChatResponse } from './dto/ChatResponse.dto';

@Controller('openai')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  // 서버 시작 시 문서 인덱싱 수행
  async onModuleInit() {
    const ragDirectory = 'src/rag';
    await this.appService.initializeRAGIndex(ragDirectory);
  }

  @Post('chat')
  async chat(@Body() chatRequest: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await this.appService.generateText(chatRequest);
      return { success: true, message: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  @Post('rag')
  async generateTextWithRAG(@Body() chatRequestBody: ChatRequest): Promise<ChatResponse> {
    const answer = await this.appService.generateTextWithRAG(chatRequestBody);
    const response: ChatResponse = { success: true, message: answer };
    return response
  }

  @Post('reset-rag')
  async resetRAG() {
    const ragDirectory = 'src/rag';  // 또는 환경 변수에서 가져온 경로
    await this.appService.resetRAGSystem(ragDirectory);
    return { message: 'RAG 시스템이 성공적으로 초기화되었습니다.' };
  }
}