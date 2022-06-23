const assert = require('assert');
const { parseRequest, parseRequestLine, parseHeaders } = require('../src/parseRequest');

describe('parseRequestLine', () => {
  it('should parse first line of request', () => {
    const line = 'HEAD / HTTP/1.1';
    const expected = { method: 'HEAD', uri: '/', httpVersion: 'HTTP/1.1' };
    assert.deepStrictEqual(parseRequestLine(line), expected);
  });
});

describe('parseHeaders', () => {
  it('should parse the headers', () => {
    const lines = ['Host:localhost:4444', 'User-Agent:curl'];
    const expected = { Host: 'localhost:4444', 'User-Agent': 'curl' };
    assert.deepStrictEqual(parseHeaders(lines), expected);
  });
});

describe('parseRequest', () => {
  it('should parse the request into request line and headers', () => {
    const chunk = 'HEAD / HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    const headers = { host: 'localhost:1244', 'user-agent': 'curl' };
    const expected = { headers, method: 'HEAD', uri: '/', httpVersion: 'HTTP/1.1' };
    assert.deepStrictEqual(parseRequest(chunk), expected);
  });
});
