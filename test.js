var x = require('./');
console.log(process.env.GITHUB_TOKEN);
var y = x(process.env.GITHUB_TOKEN);

console.log('' + y);