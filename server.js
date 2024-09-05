const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('New connection established');
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });

  ws.send(JSON.stringify({ message: 'Hello! Message From Server!!' }));
});

// Function to send a message to all connected clients
const sendMessageToAllClients = (message) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Send a new message every 5 seconds
setInterval(() => {
  const message = JSON.stringify({
    title: 'Update',
    body: `Message sent at ${new Date().toISOString()}`
  });
  sendMessageToAllClients(message);
}, 5000);

console.log('WebSocket server is running on ws://localhost:8080');
