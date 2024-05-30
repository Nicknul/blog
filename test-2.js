const fs = require('fs');
const data = fs.readFileSync('./blog.html', 'utf-8');

console.log(data);
