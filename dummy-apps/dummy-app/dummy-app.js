const http = require('http');

const useCPU = (req, res) => {
  let count = 1;
  for (let i = 1; i <= 1000000; i++) {
    count = (count + i) % 1000
  }

  console.log(`count: ${count}`);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`${count}`);
};

const server = http.createServer(useCPU);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});