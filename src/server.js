const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const getMimeType = (fileName) => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  if (extension === 'png') {
    return 'image/png';
  }
  return 'text/html';
}

const onData = (socket, handler, chunk) => {
  const request = parseRequest(chunk);
  console.log(new Date(), request.method, request.uri);
  const response = new Response(socket);
  response.setHeader('content-type', getMimeType(request.uri));
  handler(request, response);
};

const onConnection = (socket, handler, onData) => {
  socket.on('data', (chunk) => onData(socket, handler, chunk.toString()));
};

module.exports = { onConnection, onData };
