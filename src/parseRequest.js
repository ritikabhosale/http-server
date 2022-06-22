const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseHeaders = lines => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const [header, ...value] = lines[index].split(':');
    headers[header.trim()] = value.join(':').trim();
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return headers;
};

module.exports = { parseRequest, parseRequestLine, parseHeaders };
