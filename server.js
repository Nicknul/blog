const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');
const today = require('./date.js');
const blogStr = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>blog</title>
  </head>
  <body>
    <form action="/submit" method="post">
      <label for="title">제목</label><br />
      <input type="text" name="title" id="title" /><br /><br />
      <label for="content">내용</label><br />
      <textarea type="text" name="content" id="content"></textarea> <br />
      <br />
      <input type="submit" value="포스팅 하기" />
    </form>
    <div id="root">
      <h1>Menu</h1>
      <div></div>
    </div>
  </body>
</html>
`;

const dataStr = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>name</title>
        </head>
        <body>
          <div id="root">
            <h1>name</h1>
            <div>content</div>
            <a href="/">돌아가기</a>
          </div>
        </body>
      </html>`;

//* readdir
let list = '';
let link = '';

fs.readdir('./data', (err, fileList) => {
  link = fileList;
  for (let names in fileList) {
    list += `<li><a href="/data/${fileList[names]}">${fileList[names]}</a></li>`;
  }
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사:', req.url);
    if (req.url === '/') {
      // let add = blogStr.replace('<div></div>', `${list}`);
      // fs.writeFile('./blog.html', add, 'utf-8', (err) => {
      //   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      //   res.end(add);
      // });
      fs.readFile('./blog.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    }
    for (let element in link) {
      // console.log(link[element]);
      if (req.url === `/data/${link[element]}`) {
        fs.readFile(`./data/${link[element]}`, (err, data) => {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        });
      }
    }
    //* POST 요청일 때
  } else if (req.method === 'POST') {
    if (req.url === '/submit') {
      let body = '';

      req.on('data', (data) => {
        body += data.toString();
      });

      req.on('end', () => {
        let data = qs.parse(body);
        let title = data.title;
        let content = data.content;

        let a = dataStr.replace('<title>name</title>', `<title>${title}</title>`);
        let b = a.replace('<h1>name</h1>', `<h1>${title}</h1>`);
        let c = b.replace('<div>content</div>', `<div>${content}</div>`);

        // let e = [];

        // fs.readdir('./data', (err, fileList) => {
        //   for (let element in fileList) {
        //     console.log(fileList[element]);
        //   }
        // });
        fs.writeFile(`./data/${today}.html`, c, 'utf-8', () => {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(c);
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
