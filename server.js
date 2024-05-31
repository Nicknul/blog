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
    </div>
  </body>
</html>
`;

const dataStr = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>title</title>
        </head>
        <body>
          <div id="root">
            <h1>title</h1>
            <div>content</div>
            <a href="/blog.html">돌아가기</a>
          </div>
        </body>
      </html>`;

//* readdir
let list = '';

fs.readdir('./data', (err, fileList) => {
  for (let i = 0; i < fileList.length; i++) {
    list += `<div><a href="/data/${fileList[i]}">${fileList[i]}</a></div>`;
  }
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('유효성 검사: ', req.url);
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(blog);
    }
    if (req.url === '/blog.html') {
      const data = fs.readFileSync('./blog.html', 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    }
    if (req.url === `/data/${today}.html`) {
      const frist = fs.readFileSync(`./data/${today}.html`, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(frist);
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

        fs.writeFile('./blog.html', blogFileStr, 'utf-8', () => {
          let addTitle = `${title}`;
          let totalTitle = dataStr.replace('title', addTitle);
          let addContent = `${content}`;
          let totalContent = totalTitle.replace('content', addContent);

          fs.writeFile(`./data/${today}.html`, totalContent, 'utf-8', () => {
            fs.readFileSync(`./data/${today}.html`, 'utf-8');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(blog);
          });
        });

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
