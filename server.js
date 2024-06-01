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

const port = 8080;
server.listen(port, (err) => {
  if (err) {
    console.error('File Error');
  } else {
    console.log('서버 돌아가는 중');
    console.log(`http://localhost:${port}`);
  }
});
