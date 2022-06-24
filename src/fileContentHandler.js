const fs = require('fs');

const mimeTypes = {
  img: 'image/png',
  html: 'text/html'
}

const getMimeType = (fileName) => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  return mimeTypes[extension];
};

const serveFileContent = ({ uri }, response, serveFrom) => {
  uri = (uri === '/') ? '/index.html' : uri;
  const fileName = (serveFrom ? serveFrom : './public') + uri;

  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', getMimeType(uri));
    response.send(content);
    return true;
  }

  return false;
};

module.exports = { serveFileContent };
