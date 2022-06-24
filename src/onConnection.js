const { parseRequest } = require('./parseRequest');
const { Response } = require('./response.js');

const onConnection = (socket, handler, serveFrom) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handler(request, response, serveFrom);
  });

  socket.on('error', (error) => {
    console.log(error.message);
  });
};
module.exports = { onConnection };
