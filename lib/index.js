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

  var curry = require('picu').function.curry;

  this.get = curry(requestByMethod, 'get');
  this.post = curry(requestByMethod, 'post');
  this.put = curry(requestByMethod, 'put');
  this.patch = curry(requestByMethod, 'patch');
  this.delete = curry(requestByMethod, 'pdeleteatch');
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

GitHub.prototype.events = function events(callback) {
  return this.handler('events', callback);
};

GitHub.prototype.public = function public(callback) {
  return this.handler('public', callback);
};

GitHub.prototype.receivedEvents = function receivedEvents(callback) {
  return this.handler('received_events', callback);
};

GitHub.prototype.repos = function repos(owner, callback) {
  if (typeof owner === 'function') {
    callback = owner;
    owner = '';
  }

  return this.handler('repos/' + owner, callback);
};

GitHub.prototype.networks = function networks(owner, callback) {
  if (typeof owner === 'function') {
    callback = owner;
    owner = '';
  }

  return this.handler('networks/' + owner, callback);
};

GitHub.prototype.orgs = function orgs(owner, callback) {
  if (typeof owner === 'function') {
    callback = owner;
    owner = '';
  }

  return this.handler('orgs/' + owner, callback);
};

GitHub.prototype.users = function users(username, callback) {
  if (typeof username === 'function') {
    callback = username;
    username = '';
  }

  return this.handler('users/' + username, callback);
};

GitHub.prototype.repo = function repo(repo, callback) {
  if (typeof repo === 'function') {
    callback = repo;
    repo = '';
  }

  return this.handler(repo, callback);
};

GitHub.prototype.comments = function comments(callback) {
  return this.handler('comments', callback);
};

GitHub.prototype.commits = function commits(ref, callback) {
  if (typeof ref === 'function') {
    callback = ref;
    ref = '';
  }

  return this.handler('commits/' + ref, callback);
};

GitHub.prototype.issues = function issues(callback) {
  return this.handler('issues', callback);
};

GitHub.prototype.feeds = function feeds(callback) {
  return this.handler('feeds', callback);
};

GitHub.prototype.notifications = function notifications(callback) {
  return this.handler('notifications', callback);
};

GitHub.prototype.threads = function threads(id, callback) {
  if (typeof id === 'function') {
    callback = id;
    id = '';
  }

  return this.handler('threads/' + id, callback);
};

GitHub.prototype.subscription = function subscription(callback) {
  return this.handler('subscription', callback);
};

GitHub.prototype.stargazers = function stargazers(callback) {
  return this.handler('stargazers', callback);
};

GitHub.prototype.starred = function starred(owner, callback) {
  if (typeof owner === 'function') {
    callback = owner;
    owner = '';
  }

  return this.handler('starred/' + owner, callback);
};

GitHub.prototype.user = function user(callback) {
  return this.handler('user', callback);
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
