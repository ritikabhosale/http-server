const dynamicHandler = ({ uri }, response) => {
  if (uri === '/dynamic') {
    response.setHeader('content-type', 'text/html');
    response.send('This is dynamic content');
    return true;
  }
  return false;
};

module.exports = { dynamicHandler };
