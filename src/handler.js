const html = body => `<html><body>${body}</body></html>`;

const handler = ({ uri }, response) => {
  if (uri === '/') {
    response.send((html('hello')));
    return;
  }
  response.statusCode = 400;
  response.send((html('unknown')));
};

module.exports = { handler };
