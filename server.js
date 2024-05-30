const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');
const today = require('./date.js');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      const data = require('./blog.js');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(data);
      res.end();
    }
    if (req.url === '/blog.html') {
      const data = fs.readFileSync('./blog.html', 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(data);
      res.end();
    }
    if (req.url === `/data/${today}.html`) {
      const data = fs.readFileSync(`./data/${today}.html`, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
        let blog = require('./blog.js');
        // console.log(blog);
        let menu = `<a href="/data/${today}.html">${title}</a>`;
        let addMenu = blog.replace('array', menu);

        fs.writeFile('./blog.html', addMenu, 'utf-8', () => {
          let newBlog = fs.readFileSync('./blog.html', 'utf-8');

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(newBlog);
        });
      });
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
