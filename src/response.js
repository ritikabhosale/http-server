const EOL = '\r\n';

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([header, value]) =>
      this.#socket.write(`${header}: ${value}${EOL}`));
  }

  setHeader(header, value) {
    this.#headers[header] = value;
  }

  send(body) {
    this.setHeader('content-length', body.length);
    const response = `HTTP/1.1 ${this.#statusCode} ${EOL}`;
    this.#socket.write(response);
    this.#writeHeaders();
    this.#socket.write(EOL);
    this.#socket.write(body);
    this.#socket.end();
  }

  set statusCode(code) {
    this.#statusCode = code;
  }
}

module.exports = { Response };
