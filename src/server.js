const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');

const response = (text) => `HTTP/1.1 200 OK \r\n\r\n${html('hello')}`;
const html = body => `<html><body>${body}</body></html>`;

const onConnection = (socket) => {
  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {
    socket.write(response(chunk));
    socket.end();
  });
};

const main = () => {
  const PORT = 4444;
  const server = createServer((socket) => onConnection(socket));

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

main();
