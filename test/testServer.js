const assert = require('assert');
const { onConnection } = require('../src/onConnection.js');
const { EventEmitter } = require('events');

describe('onConnection', () => {
  it('should response on the basis of request', () => {
    const mockedSocket = new EventEmitter();
    let handlerInvoked = 0;
    const mockedHandler = (request, response) => handlerInvoked += 1;

    onConnection(mockedSocket, mockedHandler);
    const request = 'HEAD / HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    mockedSocket.emit('data', request);

    assert.deepEqual(handlerInvoked, 1);
  });

  it('should response on the basis of multiple requests', () => {
    const mockedSocket = new EventEmitter();
    let handlerInvoked = 0;
    const mockedHandler = (request, response) => handlerInvoked += 1;

    onConnection(mockedSocket, mockedHandler);

    let request = 'HEAD / HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    mockedSocket.emit('data', request);

    request = 'HEAD /hello HTTP/1.1\r\nhost:localhost:1244\r\nuser-agent:curl';
    mockedSocket.emit('data', request);

    assert.deepEqual(handlerInvoked, 2);
  });
});
