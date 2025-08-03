import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  async generateResponse(prompt: string): Promise<string> {
    try {
      this.logger.log(JSON.stringify({
        event: 'OpenAI API 요청 시작',
        prompt,
        timestamp: new Date().toISOString()
      }));

      const response = await axios.post(
        this.OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          },
        },
      );

      this.logger.log(JSON.stringify({
        event: 'OpenAI API 요청 성공',
        prompt,
        timestamp: new Date().toISOString()
      }));

      return response.data.choices[0].message.content;
    } catch (error) {
      this.logger.error(JSON.stringify({
        event: 'OpenAI API 요청 실패',
        prompt,
        error: error.message,
        timestamp: new Date().toISOString()
      }));

      if (axios.isAxiosError(error)) {
        throw new Error(`OpenAI API 요청 실패: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}