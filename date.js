let newDate = new Date();

let year = newDate.getFullYear();
let month = newDate.getMonth() + 1;
let date = newDate.getDate();

let today = `${year}-${month}-${date}`;

module.exports = today;
