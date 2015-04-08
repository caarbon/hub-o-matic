var curry = require('picu').function.curry;
var noOp = function() {};

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
  // this.opts.path

  this.headers = {
    Authorization: 'token ' + this.opts.token,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': this.opts.agent
  };

  if (this.opts.headers) {
    for (var key in this.opts.headers) {
      this.headers[key] = this.opts.headers[key];
    }
  }

  var leadingSlash = /^\//;
  var tailingSlash = /\/$/;

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
  this.request = function request(opts, callback) {
    var leadingPath = this.opts.path ? '/' + this.opts.path.replace(leadingSlash, '') : '';
    var path = opts.path ? '/' + opts.path.replace(leadingSlash, '') : '';

    var method = opts.method.toUpperCase();

    var req = {
      url: 'https://' + self.opts.domain + leadingPath + path,
      method: method,
      headers: self.headers
    };

    if (method === 'GET') {
      req.qs = opts.data || null;
      req.json = true;
    } else {
      req.json = opts.data;
    }

    console.log(req);

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

  this.context = function context(path) {
    var newOpts = {};

    for (var key in this.opts) {
      newOpts[key] = this.opts[key];
    }

    if (!newOpts.path) {
      newOpts.path = path;
    } else {
      newOpts.path = opts.path.replace(tailingSlash, '') + '/' + path.replace(leadingSlash, '');
    }

    return new GitHub(newOpts);
  };

  this.handler = function handler(str, callback) {
    if (typeof callback !== 'function') {
      return this.context(str);
    }

    return this.request({
      path: str,
      method: 'get'
    }, callback);
  };

  this.get = curry(requestByMethod, 'get');
  this.post = curry(requestByMethod, 'post');
  this.put = curry(requestByMethod, 'put');
  this.patch = curry(requestByMethod, 'patch');
  this.delete = curry(requestByMethod, 'delete');
  this.head = curry(requestByMethod, 'head');

  /**
   * (method, data, callback)
   * (method, data)
   * (method, callback)
   * (method)
   */
  function requestByMethod(method, data, callback) {
    if (arguments.length < 3 && typeof data === 'function') {
      callback = data;
      data = null;
    }

    return this.request({
      method: method,
      data: data
    }, callback || noOp);
  };
}

[
  ['archiveFormat'],
  'assignees',
  'blobs',
  'branches',
  'comments',
  'commits',
  'collaborators',
  'compare',
  'contents',
  'contributors',
  'emojis',
  'events',
  'feeds',
  'files',
  'forks',
  'gists',
  'git',
  'gitignore',
  'hooks',
  'issues',
  'keys',
  'labels',
  'languages',
  'licenses',
  'markdown',
  'members',
  'memberships',
  'merge',
  'meta',
  'milestones',
  'networks',
  'notifications',
  'orgs',
  'public',
  'publicMembers',
  'pulls',
  'rateLimit',
  'readme',
  'receivedEvents',
  ['ref'],
  'refs',
  ['repo'], // (⇀‸↼‶)
  'repos',
  'repositories',
  ['sha'],
  'star',
  'stargazers',
  'starred',
  'subscribers',
  'subscription',
  'subscriptions',
  'tags',
  'teams',
  'templates',
  'threads',
  'trees',
  'user',
  'users'
].forEach(function(thang) {
  var isArray = Array.isArray(thang);
  var prefix = isArray ? '' : thang;
  thang = isArray ? thang[0] : thang;
  GitHub.prototype[thang] = curry(omniproto, prefix);
});

function omniproto(pathPrefix, identifier, callback) {
  if (arguments.length === 1 || typeof identifier === 'function') {
    callback = identifier;
    identifier = '';
  }

  return this.handler(pathPrefix + (identifier ? '/' + identifier : ''), callback);
}

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
