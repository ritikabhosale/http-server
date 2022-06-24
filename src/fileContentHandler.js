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
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', getMimeType(uri));
    response.send(content);
    return true;
  }

  return false;
};

module.exports = { serveFileContent };
