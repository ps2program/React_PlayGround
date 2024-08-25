Let's create the `useWebSocket` custom hook to manage a WebSocket connection. This hook will handle opening the WebSocket connection, receiving messages, and sending data.

### Custom Hook: `useWebSocket(url)`

**Functionality:**
- Open a WebSocket connection to the provided URL.
- Handle incoming messages and store them.
- Provide a method to send messages through the WebSocket.

**Implementation:**

```jsx
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
```

### Usage Example

Here's how you might use the `useWebSocket` hook in a component:

```jsx
import React, { useState } from 'react';
import useWebSocket from './useWebSocket'; // Adjust the path as necessary

function WebSocketComponent() {
  const { messages, sendMessage, isConnected } = useWebSocket('wss://example.com/socket'); // Replace with your WebSocket URL
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

export default WebSocketComponent;
```

### Summary
- **`useWebSocket(url)`** manages a WebSocket connection.
- It handles opening the connection, receiving and storing messages, and provides a method to send messages.
- It also manages the connection state with `isConnected`.

Feel free to integrate and adjust this hook as needed in your application. If you have any more questions or need further modifications, just let me know!


________________________________________________________________________________________

create ws_server

To integrate the WebSocket server with the `useWebSocket` custom hook, you need to ensure that your WebSocket client (the React app) connects to the WebSocket server you created. Here’s how you can use the `useWebSocket` hook with the WebSocket server:

### 1. **Update the WebSocket Server**

Make sure your WebSocket server (`server.js`) is running on the correct port and is set up to handle connections. Here’s the `server.js` code for reference:

```js
// server.js
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running\n');
});

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    
    // Send a response message
    ws.send(`Server received: ${message}`);
  });

  // Handle WebSocket connection close
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server');
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
```

### 2. **Create the `useWebSocket` Custom Hook**

Here’s the `useWebSocket` custom hook that connects to the WebSocket server:

```jsx
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
```

### 3. **Create a React Component to Use the Hook**

Here’s how you can use the `useWebSocket` hook in a React component:

```jsx
// WebSocketComponent.jsx
import React, { useState } from 'react';
import useWebSocket from './useWebSocket'; // Adjust the path as necessary

function WebSocketComponent() {
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

export default WebSocketComponent;
```

### Summary

1. **Ensure your WebSocket server** is running and accessible at `ws://localhost:8080` (or adjust the URL as needed).
2. **Use the `useWebSocket` hook** to connect to the WebSocket server, handle messages, and send data.
3. **Create a React component** to utilize the `useWebSocket` hook and interact with the WebSocket server.

Make sure the WebSocket server is properly started before testing the React component. If you encounter any issues, check the console for error messages and ensure that the WebSocket server and client are using the correct URL and ports. Let me know if you need further assistance!


Run the WebSocket Server
To start the WebSocket server, run the following command in your terminal:

node ws_server.js

to intall wesocket -

npm install ws
