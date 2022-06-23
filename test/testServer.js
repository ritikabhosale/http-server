const assert = require('assert');
const { Response } = require('../src/response.js');
const { handler } = require('../src/handler.js');
const { onConnection, onData } = require('../src/server.js');

describe('handler', () => {
  it('should write on the basis of request', () => {
    let actual;
    const mockedSocket = { write: (data) => actual = data, end: (x) => x };
    const response = new Response(mockedSocket);

    handler({ uri: '/' }, response);
    const expected = 'HTTP/1.1 200 \r\n\r\n<html><body>hello</body></html>';
    assert.deepStrictEqual(actual, expected);
  });

  it('should write unknown for invalid request', () => {
    let actual;
    const mockedSocket = { write: (data) => actual = data, end: (x) => x };
    const response = new Response(mockedSocket);

    handler({ uri: '/fake' }, response);
    const expected = 'HTTP/1.1 400 \r\n\r\n<html><body>unknown</body></html>';
    assert.deepStrictEqual(actual, expected);
  });
});

const mockSocket = () => {
  return {
    actual: null,
    callback: x => x,
    write: function (data) { this.actual = data },
    on: function (event, cb) { this.callback = cb },
    end: (x) => x,
    setEncoding: x => x
  };
}

describe('onConnection', () => {
  it('should response on the basis of request', () => {
    const mockedSocket = mockSocket();
    onConnection(mockedSocket, handler, onData);

    const request = 'HEAD / HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    const expected = 'HTTP/1.1 200 \r\n\r\n<html><body>hello</body></html>';

    mockedSocket.callback(request);
    assert.deepEqual(mockedSocket.actual, expected);
  });

  it('should response on the basis of request', () => {
    const mockedSocket = mockSocket();
    onConnection(mockedSocket, handler, onData);

    const request = 'HEAD /abc HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    const expected = 'HTTP/1.1 400 \r\n\r\n<html><body>unknown</body></html>';

    mockedSocket.callback(request);
    assert.deepEqual(mockedSocket.actual, expected);
  });
});

describe('onData', () => {
  const mockedSocket = mockSocket();
  it('should handle request and give appropriate response', () => {
    const request = 'HEAD / HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    const expected = 'HTTP/1.1 200 \r\n\r\n<html><body>hello</body></html>';

    onData(mockedSocket, handler, request);
    assert.deepStrictEqual(mockedSocket.actual, expected);
  });
});
