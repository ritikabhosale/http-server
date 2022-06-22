const { createServer } = require('net');

const main = () => {
  const PORT = 4444;
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      console.log(chunk);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

main();
