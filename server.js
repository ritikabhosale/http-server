const { createServer } = require('net');
const { onConnection } = require('./src/onConnection');
const { requestHandler } = require('./src/createHandler.js');

const startServer = (PORT, handler, serveFrom) => {
  const server = createServer((socket) => {
    onConnection(socket, handler, serveFrom);
  });

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
};

const serveFrom = process.argv[2];
startServer(4444, requestHandler, serveFrom);

module.exports = { onConnection };
