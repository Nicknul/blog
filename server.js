const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
  }
});

const port = 3000;
server.listen(port, (err) => {
  if (err) {
    console.error('File Error');
  } else {
    console.log('서버 돌아가는 중');
    console.log(`http://localhost:${port}`);
  }
});
