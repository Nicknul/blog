let now = new Date();

let year = now.getFullYear();
// console.log(year);
let month = now.getMonth() + 1;
// console.log(month);
let date = now.getDate();
// console.log(date);

let totalNow = `${year}-${month}-${date}`;

console.log(totalNow);

module.exports = totalNow;
