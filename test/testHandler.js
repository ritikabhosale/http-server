const assert = require('assert');
const { Response } = require('../src/response.js');
const { handler } = require('../src/handler.js');

describe('handler', () => {
  it('should write on the basis of request', () => {
    let actual = '';
    const mockedSocket = { write: (data) => actual += data, end: (x) => x };
    const response = new Response(mockedSocket);

    handler({ uri: '/' }, response);
    const expected = 'HTTP/1.1 200 \r\n\content-length: 31\r\n\r\n<html><body>hello</body></html>';

    assert.deepStrictEqual(actual, expected);
  });

  it('should write unknown for invalid request', () => {
    let actual = '';
    const mockedSocket = { write: (data) => actual += data, end: (x) => x };
    const response = new Response(mockedSocket);

    handler({ uri: '/fake' }, response);
    const expected = 'HTTP/1.1 400 \r\ncontent-length: 33\r\n\r\n<html><body>unknown</body></html>';

    assert.deepStrictEqual(actual, expected);
  });
});
