import styles from '../css/ChatHistory.module.css'
import type { ChatMessage } from '../models/chat'

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  if (messages.length === 0) return null;

  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.role === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <div className={styles.content}>{message.content}</div>
          <div className={styles.timestamp}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  )
}