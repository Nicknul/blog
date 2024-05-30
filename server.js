const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      fs.readFile('./public/blog.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('서버 자체 자체');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    }
    if (req.url === '/test.js') {
      fs.readFile('./public/test.js', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('서버 자체 자체');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    if (req.url === '/submit') {
    }
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
