const { createServer } = require('net');
const { serveFileContent } = require('./src/fileContentHandler.js');
const { parseRequest } = require('./src/parseRequest');
const { Response } = require('./src/response.js');

const onConnection = (socket, handler) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handler(request, response);
  });
};

const startServer = (PORT, handler) => {
  const server = createServer((socket) =>
    onConnection(socket, handler));

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

startServer(4444, serveFileContent);

module.exports = { onConnection };
