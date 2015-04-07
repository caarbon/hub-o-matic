// var x = require('./');
// var y = x(process.env.GITHUB_TOKEN);

// y.repos(function(err, body, paging) {
//   console.log(err);
//   console.log(body);
//   console.log(paging);
// });


var x = require('./');
var y = x(process.env.GITHUB_TOKEN);

y.users('tmarshall').events().public(function(err, body) {
  console.log(err);
  console.log(body);
});
