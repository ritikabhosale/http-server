const { createServer } = require('net');
const { handler } = require('./src/handler');
const { onConnection } = require('./src/server');

const startServer = (PORT, handler) => {
  const server = createServer((socket) => onConnection(socket, handler));

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

startServer(4444, handler);
