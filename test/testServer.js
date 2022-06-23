const assert = require('assert');
const { Response } = require('../src/response');
const { handleRequest } = require('../src/server');

describe('handleRequest', () => {
  it('should write on the basis of request', () => {
    let actual;
    const mockedSocket = { write: (data) => actual = data, end: (x) => x };
    const response = new Response(mockedSocket);

    handleRequest({ uri: '/' }, response);
    const expected = 'HTTP/1.1 200 \r\n\r\n<html><body>hello</body></html>';
    assert.deepStrictEqual(actual, expected);
  });

  it('should write unknown for invalid request', () => {
    let actual;
    const mockedSocket = { write: (data) => actual = data, end: (x) => x };
    const response = new Response(mockedSocket);

    handleRequest({ uri: '/fake' }, response);
    const expected = 'HTTP/1.1 400 \r\n\r\n<html><body>unknown</body></html>';
    assert.deepStrictEqual(actual, expected);
  });
});
