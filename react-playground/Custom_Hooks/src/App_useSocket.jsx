import React, { useState } from 'react';
import useSocket from './useSocket';

function App() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useSocket('http://localhost:8080');

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <div>
      <h1>Socket.io Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
