var x = require('./');
var y = x(process.env.GITHUB_TOKEN);

y.events(function(err, body, paging) {
  console.log(err);
  console.log(body);
  console.log(paging);

  setTimeout(function() {
    paging.next(function(err, body) {
      console.log(err);
      console.log(body);
      console.log(paging);
    });
  }, 3000);
});
