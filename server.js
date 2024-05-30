const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      const data = fs.readFileSync('./blog.html');

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

        let today = require('./date.js');

        fs.writeFile(`./data/${today}.html`, content, 'utf-8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('서버 자체 오류');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end();
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end();
      return;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end();
    return;
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
