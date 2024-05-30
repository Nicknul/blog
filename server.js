const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');

fs.readdir('data', 'utf-8', (err, fileList) => {
  console.log(fileList);
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      const data = fs.readFileSync('./blog.html');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=stf-8' });
      res.write(data);
      res.end();
    }
    if (req.url === '/blog.html') {
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

        //* 일자 가져오기
        let today = require('./date.js');
        //* html 구조 가져오기
        let string = require('./string.js');

        let name = `<title>${title}`;
        let a = string.replace('<title>', name);
        let h1 = `<h1>${title}`;
        let b = a.replace('<h1>', h1);
        let div = `<div>${content}`;
        let c = b.replace('<div>', div);
        let menu = `
          <h1>Menu</h1>
          <a href="/data/${today}.html">${homeMenu}</a>
          `;
        let d = c.replace('<h1>');

        let homeMenu = [];

        //? 사용자가 '포스팅 하기'를 누르면 html 파일 생성
        fs.writeFile(`./data/${today}.html`, c, 'utf-8', (err) => {
          //? 생성한 파일 그대로 읽기
          let newHtml = fs.readFileSync(`./data/${today}.html`, 'utf-8');
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('서버 자체 오류');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(newHtml);
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 code는 페이지 없음');
      return;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 cod는 페이지 없음');
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
