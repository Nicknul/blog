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
  console.log(link);
  // list = fileList;
  for (let i = 0; i < fileList.length; i++) {
    list += `<li><a href="/data/${fileList[i]}">${fileList[i]}</a></li>`;
  }
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사:', req.url);
    if (req.url === '/') {
      let add = blogStr.replace('<div></div>', `${list}`);
      fs.writeFile('./blog.html', add, 'utf-8', (err) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(add);
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

        let add = blogStr.replace('<div></div>', `${list}`);

        let e = [];
        fs.readdir('./data', 'utf-8', (err, fileList) => {
          e += fileList;
          console.log(e);
        });

        fs.writeFile(`./data/${today}.html`, c, 'utf-8', (err) => {
          if (err) {
            console.log(err);
          }
          fs.writeFile('./blog.html', add, 'utf-8', (err) => {
            if (err) {
              console.log(err);
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(add);
          });
          // fs.readFile('./blog.html', (err, data) => {
          //   if (err) {
          //     console.log(err);
          //   }
          //   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          //   res.end(data);
          // });
          // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          // res.end();
        });
        // fs.writeFile('./blog.html', add, 'utf-8', () => {
        //   fs.writeFileSync(`./data/${today}.html`, c, 'utf-8');
        //   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //   res.end(add);
        // });

        // //* blog.html menu
        // let blogFileStr = `<!DOCTYPE html>
        // <html lang="en">
        //   <head>
        //     <meta charset="UTF-8" />
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //     <title>blog</title>
        //   </head>
        //   <body>
        //     <form action="/submit" method="post">
        //       <label for="title">제목</label><br />
        //       <input type="text" name="title" id="title" /><br /><br />
        //       <label for="content">내용</label><br />
        //       <textarea type="text" name="content" id="content"></textarea> <br />
        //       <br />
        //       <input type="submit" value="포스팅 하기" />
        //     </form>
        //     <div id="root">
        //       <h1>Menu</h1>
        //       <a href="./data/${today}.html">${title}</a>
        //     </div>
        //   </body>
        // </html>
        // `;

        // fs.writeFile('./blog.html', blogFileStr, 'utf-8', () => {
        //   const read = fs.readFileSync('./blog.html', 'utf-8');

        //   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //   res.end(read);
        // });

        // let blog = require('./blog.js');
        // let menu = `<a href="/data/${today}.html">${title}</a>`;
        // let addMenu = blog.replace('array', menu);

        // fs.writeFile('./blog.html', addMenu, 'utf-8', () => {
        //   let newBlog = fs.readFileSync('./blog.html', 'utf-8');

        //   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //   res.end(newBlog);
        // });
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
