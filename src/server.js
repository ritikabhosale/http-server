const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');

const html = body => `<html><body>${body}</body></html>`;

const response = body => `HTTP/1.1 200 OK \r\n\r\n${body}`;

const handleRequest = ({ uri }, socket) => {
  if (uri === '/') {
    socket.write(response(html('hello')));
    return;
  }
  socket.write(response(html('unknown')));
};

const onConnection = (socket) => {
  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    handleRequest(request, socket);
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
