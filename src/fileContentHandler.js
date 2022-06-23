const fs = require('fs');

const serveFileContent = ({ uri }, response) => {
  uri = (uri === '/') ? '/index.html' : uri;

  const fileName = './public' + uri;
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.send(content);
    return;
  }
  response.send('Page Not Found');
};

module.exports = { serveFileContent };
