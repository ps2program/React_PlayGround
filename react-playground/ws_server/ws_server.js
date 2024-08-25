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
