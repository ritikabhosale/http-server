const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const onData = (socket, handler, chunk) => {
  const request = parseRequest(chunk);
  const response = new Response(socket);
  handler(request, response);
};

const onConnection = (socket, handler, onData) => {
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => onData(socket, handler, chunk));
};

module.exports = { onConnection, onData };
