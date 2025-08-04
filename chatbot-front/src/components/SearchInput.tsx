import { useState } from 'react'
import styles from '../css/SearchInput.module.css'

interface SearchInputProps {
  onSubmit: (input: string) => Promise<void>;
  isLoading: boolean;
}

export function SearchInput({ onSubmit, isLoading }: SearchInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = async () => {
    if (!input.trim()) return
    await onSubmit(input)
    setInput('') // 제출 후 입력창 비우기
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className={styles.button}
      >
        {isLoading ? '처리중...' : '전송'}
      </button>
    </div>
  )
}