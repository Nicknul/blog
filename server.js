const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      const data = fs.readFileSync('./string.html');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=stf-8' });
      res.write(data);
      res.end();
    }
    //* POST 요청일 때
  } else if (req.method === 'POST') {
    if (req.url === '/submit') {
      let body = '';

      req.on('data', (data) => {
        body += data.toString();
        // console.log(body);
      });

      req.on('end', () => {
        let data = qs.parse(body);
        let title = data.title;
        let content = data.content;
        // console.log(title, content);
      });

      fs.writeFile();
    }
  }
});

const port = 8080;
server.listen(port, (err) => {
  if (err) {
    console.error('File Error');
  } else {
    console.log('서버 돌아가는 중');
    console.log(`http://localhost:${port}`);
  }
});
