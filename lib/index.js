function HubOMatic(token) {
  return new GitHub(token);
}

function GitHub(opts) {
  if (opts === undefined) {
    throw Error('Expecting token or options');
  }

  var self = this;

  this.opts = typeof opts === 'string' ? {
    token: opts
  } : opts;

  this.opts.agent = this.opts.agent || 'hub-o-matic';
  this.opts.domain = this.opts.domain || 'api.github.com';

  this.headers = {
    Authorization: 'token ' + this.opts.token,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': this.opts.agent
  };

  var leadingSlash = /^\//;

  /**
   * Helper request method
   *
   * `otps` consists of:
   *   - path (e.g. `events`)
   *   - method (e.g. `get`)
   *   - data (any query or body content)
   *
   * @param  {Object}   opts     Options used for request
   * @param  {Function} callback Callback func
   * @return {Object}            `this`
   */
  this.request = function(opts, callback) {
    var path = opts.path.replace(leadingSlash, '');

    var method = opts.method.toUpperCase();

    var req = {
      url: 'https://' + self.opts.domain + (path ? '/' + path : path),
      method: method,
      headers: self.headers
    };

    if (method === 'GET') {
      req.qs = opts.data || null;
      req.json = true;
    } else {
      req.json = opts.data;
    }

    require('request')(req, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      var paging = {
        get first() {
          return paged('first', res, opts);
        },

        get prev() {
          return paged('prev', res, opts);
        },

        get next() {
          return paged('next', res, opts);
        },

        get last() {
          return paged('last', res, opts);
        }
      };

      callback(null, body, paging);
    });

    return this;
  };

  function paged(direction, res, opts) {
    var directions = parseLink(res.headers.link);

    if (!directions[direction]) {
      return null;
    }

    var url = require('url').parse(directions[direction]);
    var data = url.query ? require('querystring').parse(url.query) : null;

    return function(callback) {
      self.request({
        path: url.pathname,
        method: opts.method,
        data: data
      }, callback);
    };
  }
}

GitHub.prototype.events = function(callback) {
  this.request({
    path: 'events',
    method: 'get'
  }, callback);
};

function parseLink(link) {
  var expr = /<([^>]+)>; rel="([a-z]+)"/g;
  var match;
  var directions = {};

  while (match = expr.exec(link)) {
    directions[ match[2] ] = match[1];
  }

  return directions;
}

module.exports = HubOMatic;
