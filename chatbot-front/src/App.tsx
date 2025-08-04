import { useState } from 'react'
import { SearchInput } from './components/SearchInput'
import { ChatHistory } from './components/ChatHistory'
import { fetchOpenAIResponse } from './logic/openai'
import type { ChatMessage } from './models/chat'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await fetchOpenAIResponse(input);

      // AI 응답 메시지 추가
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        content: result,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // 에러 메시지 추가
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        content: 'Error occurred while fetching response',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app-container'>
        <ChatHistory messages={messages} />
        <SearchInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default App;