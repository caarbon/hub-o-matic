function HubOMatic(token) {
  return new GitHub(token);
}

function getVersion(callback) {
  var fs = require('fs');
  var path = require('path');

  fs.readFile(path.resolve(__dirname, 'package.json'), 'utf8', function(err, content) {
    if (err) {
      return callback(err);
    }

    callback(null, content.version);
  });
}

function GitHub(opts) {
  opts = typeof opts === 'string' ? {
    token: opts
  } : opts;

  var series = [];

  series.push(function(callback) {
    if (opts.agent) {
      return callback();
    }

    getVersion(function(err, version) {
      opts.agent = 'hub-o-matic';
      opts.agent += err ? '' : '(' + version + ')';
      callback();
    });
  });

  series.push(function(callback) {
    opts.domain = opts.domain || 'api.github.com';

    console.log('going...');
    require('request')({
      url: 'https://' + opts.domain,
      method: 'GET',
      headers: {
        Authorization: 'token ' + opts.token,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': opts.agent
      },
      json: true
    }, function(err, res, body) {
      console.log(err);
      console.log(body);
      callback();
    });
  });

  require('async').series(series, function(err) {
    if (err) {
      throw err;
    }
  });
}

module.exports = HubOMatic;
