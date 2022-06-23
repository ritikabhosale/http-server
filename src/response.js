class Response {
  #socket;
  #statusCode;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
  }

  send(body) {
    const response = `HTTP/1.1 ${this.#statusCode} \r\n\r\n${body}`;
    this.#socket.write(response);
    this.#socket.end();
  }

  set statusCode(code) {
    this.#statusCode = code;
  }
}

module.exports = { Response };
