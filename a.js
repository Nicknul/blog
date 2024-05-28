// let a = `{
//   "title": "1",
//   "content": "2"
// }`;
// console.log(a);
// let b = JSON.parse(a);
// console.log(b);

// let a = require('./public/blog.html');
// console.log(a);
// let b = JSON.parse(a);
// console.log(b);
let c = require('./public/data.json');
console.log(c);

let b = `
<head></head>
<body>
${c.title}
</body>
`;

console.log(b);
