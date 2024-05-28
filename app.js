const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('node:querystring');
const { connect } = require('http2');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, './public/blog.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('서버 자체 오류');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    }
    if (req.url === '/blog.js') {
      fs.readFile(path.join(__dirname, './public/blog.js'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('서버 자체 오류');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    if (req.url === '/submit') {
      let body = '';
      req.on('data', (data) => {
        body += data.toString();
      });
      req.on('end', () => {
        const parseData = qs.parse(body);
        console.log(parseData);
        const title = parseData.title;
        console.log(title);
        const content = parseData.content;
        console.log(content);

        const jsonData = {
          title: title,
          content: content,
        };

        const jsonDataString = JSON.stringify(jsonData, null, 2);
        fs.writeFile(path.join(__dirname, './public/data.json'), jsonDataString, (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('서버 자체 오류');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          let jsonDataView = JSON.stringify(jsonData, null, 2);
          res.end(jsonDataView);
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 code는 페이지를 찾을 수 없음');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 code는 페이지를 찾을 수 없음');
  }
});

const port = 3001;
server.listen(port, (err) => {
  if (err) {
    console.error('File Error');
  } else {
    console.log('서버 돌아가는 중');
    console.log(`http://localhost:${port}`);
  }
});
