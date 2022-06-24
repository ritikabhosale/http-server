const { serveFileContent } = require('./fileContentHandler');
const { dynamicHandler } = require('./dynamicHandler');
const { notFoundHandler } = require('./notFoundHandler');

const createHandler = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

const handlers = [serveFileContent, dynamicHandler, notFoundHandler];
module.exports = { requestHandler: createHandler(handlers) };
