import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import type { ChatRequest } from './dto/ChatRequest.dto';
import { ChatResponse } from './dto/ChatResponse.dto';

@Controller('openai')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/chat')
  async chat(@Body() chatRequest: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await this.appService.generateResponse(chatRequest.prompt);
      return { success: true, message: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}