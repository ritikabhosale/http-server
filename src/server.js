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

const onConnection = (socket, handler) => {
  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    handler(request, socket);
    socket.end();
  });
};

module.exports = { onConnection, handleRequest };
