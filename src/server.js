const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const onConnection = (socket, handler) => {
  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    const response = new Response(socket);
    handler(request, response);
  });
};

module.exports = { onConnection };
