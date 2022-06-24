const { createServer } = require('net');
const { onConnection } = require("./src/onConnection");
const { serveFileContent } = require('./src/fileContentHandler.js');

const startServer = (PORT, handler) => {
  const server = createServer((socket) => onConnection(socket, handler));

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  });
};

startServer(4444, serveFileContent);

module.exports = { onConnection };
