const http = require('http');
const fs = require('fs');
const qs = require('node:querystring');
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

let list = '';
let link = '';
fs.readdir('./data', 'utf-8', (err, fileList) => {
  for (let element in fileList) {
    list += `<li><a href="/data/${fileList[element]}">${fileList[element]}</a></li>`;
  }
  link = fileList;
  console.log(link);
});
const server = http.createServer((req, res) => {
  console.log('유효성 검사:', req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      let a = blogStr.replace('<div></div>', list);
      fs.writeFileSync('./blog.html', a, 'utf-8');
      let b = fs.readFileSync('./blog.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(b);
    }
    for (let element in link) {
      if (req.url === `/data/${link[element]}`) {
        let a = fs.readFileSync(`./data/${link[element]}`, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(a);
      }
    }
  } else if (req.method === 'POST') {
    console.log('유효성 검사:', req.url);
    if (req.url === '/submit') {
      let body = '';
      req.on('data', (data) => {
        body += data.toString();
        // console.log(body);
      });
      req.on('end', () => {
        let bodyUrl = qs.parse(body);
        let de = qs.decode(body);
        console.log(de);
        let title = de.title;
        let content = de.content;
        // console.log(title, content);

        let a = dataStr.replace('<title>name</title>', `<title>${title}</title>`);
        let b = a.replace('<h1>name</h1>', `<h1>${title}</h1>`);
        let c = b.replace('<div>content</div>', `<div>${content}</div>`);

        fs.writeFile(`./data/${title}.html`, c, 'utf-8', () => {
          let d = '';
          fs.readdir('./data', 'utf-8', (err, fileList) => {
            for (let element in fileList) {
              d += `<li><a href="/data/${fileList[element]}">${fileList[element]}</a></li>`;
            }
            let add = blogStr.replace('<div></div>', d);
            fs.writeFile('./blog.html', add, 'utf-8', () => {
              // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              // res.end(add);
              fs.readFile(`./data/${title}.html`, 'utf-8', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
              });
            });
          });

          // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          // res.end(add)
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
