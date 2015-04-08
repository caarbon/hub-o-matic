// var x = require('./');
// var y = x(process.env.GITHUB_TOKEN);

// y.repos(function(err, body, paging) {
//   console.log(err);
//   console.log(body);
//   console.log(paging);
// });


var x = require('./');
var y = x(process.env.GITHUB_TOKEN);

y.gists('12de1d277c837b582a7c').delete(function(err, body) {
  console.log(err);
  console.log(body);
});
