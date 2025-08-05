import type { ChatResponse } from '../dto/ChatResponse.dto'
import type { ChatRequest } from '../dto/ChatRequest.dto'

export async function fetchOpenAIResponse(input: string, timestamp: string): Promise<string> {
  try {
    const chatRequest: ChatRequest = {
      prompt: input,
      timestamp: timestamp
    };

    const response = await fetch('http://localhost:3000/openai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRequest),
    });

    const data: ChatResponse = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch response')
    }

    return data.message || ''
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to fetch response from server')
  }
}