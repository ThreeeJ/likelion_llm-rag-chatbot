import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styles from './Counter.module.css'

// Counter 컴포넌트 정의
interface CounterProps {
  count: number;
  onCountChange: (newCount: number) => void;
  buttonText: string;
}

function Counter({ count, onCountChange, buttonText }: CounterProps) {
  return (
    <div className={styles.card}>
      <button
        className={styles.button}
        onClick={() => onCountChange(count - 1)}
      >
        {buttonText} {count}
      </button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(5)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Props 예시</h1>
      
      {/* Counter 컴포넌트에 props 전달 */}
      <Counter
        count={count}
        onCountChange={setCount}
        buttonText="카운트:"
      />

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App