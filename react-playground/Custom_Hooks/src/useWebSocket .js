// useWebSocket.js
import { useState, useEffect, useRef } from 'react';

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Create a new WebSocket connection
    ws.current = new WebSocket(url);

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle connection open
    ws.current.onopen = () => {
      setIsConnected(true);
    };

    // Handle connection close
    ws.current.onclose = () => {
      setIsConnected(false);
    };

    // Clean up on component unmount
    return () => {
      ws.current.close();
    };
  }, [url]);

  // Function to send a message
  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(message);
    } else {
      console.warn('WebSocket is not connected.');
    }
  };

  return { messages, sendMessage, isConnected };
}

export default useWebSocket;
