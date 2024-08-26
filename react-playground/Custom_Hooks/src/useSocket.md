Let's break down the process into two parts: creating a `socket.io` server in Node.js and then creating a custom React hook to use the `socket.io` client in your React app.

### **Part 1: Create a `socket.io` Server in Node.js**

1. **Initialize a Node.js Project:**
   If you haven’t already, create a new Node.js project:

   ```bash
   mkdir socket-io-server
   cd socket-io-server
   npm init -y
   ```

2. **Install Dependencies:**
   Install `express` and `socket.io`:

   ```bash
   npm install express socket.io
   ```

3. **Create the Server:**
   Create a file named `server.js` with the following content:

   ```javascript
   const express = require('express');
   const http = require('http');
   const { Server } = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = new Server(server, {
     cors: {
       origin: "http://localhost:3000", // Update with your React app's URL
       methods: ["GET", "POST"]
     }
   });

   io.on('connection', (socket) => {
     console.log('a user connected');

     socket.on('message', (msg) => {
       console.log('message: ' + msg);
       io.emit('message', msg);
     });

     socket.on('disconnect', () => {
       console.log('user disconnected');
     });
   });

   server.listen(8080, () => {
     console.log('listening on *:8080');
   });
   ```

4. **Run the Server:**
   Start the server by running:

   ```bash
   node server.js
   ```

   Your server will now be running on `http://localhost:8080`.

### **Part 2: Create a Custom React Hook for `socket.io`**

1. **Install `socket.io-client`:**
   In your React app, install the `socket.io-client` package:

   ```bash
   npm install socket.io-client
   ```

2. **Create the Custom Hook:**
   Create a new file named `useSocket.js` in your `src` directory:

   ```javascript
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
   ```

3. **Use the Custom Hook in a Component:**
   Now, create a component that uses this custom hook. For example, create a file named `App_useSocket.js`:

   ```javascript
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
   ```

4. **Run Your React App:**
   Start your React app and visit `http://localhost:3000` (assuming it's running there). You should be able to send and receive messages using your Socket.io setup.

### **Summary**

- You created a `socket.io` server using Node.js.
- You created a custom React hook, `useSocket`, to manage the connection and messaging with the server.
- You integrated the hook into a React component to create a simple chat interface.

This setup should give you a basic real-time messaging app using `socket.io` in Node.js and React.