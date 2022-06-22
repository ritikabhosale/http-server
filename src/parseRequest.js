const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\n');
  const requestLine = parseRequestLine(lines[0]);
  return requestLine;
};

module.exports = { parseRequest, parseRequestLine };
