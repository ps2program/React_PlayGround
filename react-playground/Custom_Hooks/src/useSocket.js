import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  return { messages, sendMessage };
};

export default useSocket;
