const { createServer } = require('net');
const { serveFileContent } = require('./src/fileContentHandler.js');
const { onConnection, onData } = require('./src/server');

const startServer = (PORT, handler) => {
  const server = createServer((socket) => onConnection(socket, handler, onData));

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

startServer(4444, serveFileContent);
