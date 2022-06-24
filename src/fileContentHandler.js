const fs = require('fs');

const getMimeType = (fileName) => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  if (extension === 'png') {
    return 'image/png';
  }
  return 'text/html';
};

const serveFileContent = ({ uri }, response) => {
  uri = (uri === '/') ? '/index.html' : uri;

  const fileName = './public' + uri;
  if (fs.existsSync(fileName)) {
    response.setHeader('content-type', getMimeType(uri));
    const content = fs.readFileSync(fileName);
    response.send(content);
    return;
  }
  response.statusCode = 400;
  response.setHeader('content-type', 'text/html');
  response.send('Page Not Found');
};

module.exports = { serveFileContent };
