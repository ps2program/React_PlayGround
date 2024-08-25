// WebSocketComponent.jsx
import React, { useState } from 'react';
// import useWebSocket from './useWebSocket'; // Adjust the path as necessary
import useWebSocket from './useWebSocket ';

function App() {
  const { messages, sendMessage, isConnected } = useWebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL
  const [messageToSend, setMessageToSend] = useState('');

  const handleSend = () => {
    sendMessage(messageToSend);
    setMessageToSend('');
  };

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <div>
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend} disabled={!isConnected}>Send</button>
      </div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
