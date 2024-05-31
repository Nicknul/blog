let newDate = new Date();
// console.log(newDate);

let year = newDate.getFullYear();
let month = newDate.getMonth() + 1;
let date = newDate.getDate();
let hours = newDate.getHours();
let minutes = newDate.getMinutes();
let seconds = newDate.getSeconds();
// console.log(a);

let today = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;

module.exports = today;
