# Hub-o-Matic

Hub-o-Matic is a Node wrapper for the GitHub V3 API.

## Usage

```js
var HubOMatic = require('hub-o-matic');
var client = HubOMatic(process.env.GITHUB_TOKEN);
```

Or, if you need to be fancy

```js
var HubOMatic = require('hub-o-matic');
var client = HubOMatic({
  token: process.env.GITHUB_TOKEN),
  domain: 'https://{hostname}/api/v3/',
  agent: 'hub-o-matic',
  headers: {
    Some: 'Header'
  }
});
```

### Callbacks

All callbacks receive three arugments.

```js
function callback(err, body, pagination) {}
```

`body` is the response payload.
`pagination` has four attributes; `first`, `previous`, `next` and `last`

You can call any of these, assuming they are present, to page to the next set of records.

```js
pagination.next(function(err, res, pagination) {});
```

### GETs

In all the docs below, get requests look like

```js
client.user().subscriptions('tmarshall').repo('hub-o-matic', callback);
```

while a PUT would be something like

```js
client.user().subscriptions('tmarshall').repo('hub-o-matic').put(callback);
```

if you'd like to be consistent with the syntax, you can write the GET as

```js
client.user().subscriptions('tmarshall').repo('hub-o-matic').get(callback);
```

### Request methods

On any chain, you can end it with `get`, `post`, `put`, `patch`, `delete` or `head`.

You can pass `data, callback`, just `callback`, just `data`, or nothing at all.

### [Activity](https://developer.github.com/v3/activity/)

#### [Events](https://developer.github.com/v3/activity/events/)

```js
// GET /events
client.events(callback);

// GET /repos/:owner/:repo/events
client.repos('caarbon').repo('hub-o-matic').events(callback);

// GET /repos/:owner/:repo/issues/events
client.repos('caarbon').repo('hub-o-matic').issues().events(callback);

// GET /networks/:owner/:repo/events
client.networks('caarbon').repo('hub-o-matic').events(callback);

// GET /orgs/:org/events
client.orgs('caarbon').events(callback);

// GET /users/:username/received_events
client.users('tmarshall').receivedEvents(callback);

// GET /users/:username/received_events/public
client.users('tmarshall').receivedEvents().public(callback);

// GET /users/:username/events
client.users('tmarshall').events(callback);

// GET /users/:username/events/public
client.users('tmarshall').events().public(callback);

// GET /users/:username/events/orgs/:org
client.users('tmarshall').events().orgs('caarbon', callback);
```

#### [Feeds](https://developer.github.com/v3/activity/feeds/)

```js
// GET /feeds
client.feeds(callback);
```

#### [Notifications](https://developer.github.com/v3/activity/notifications/)

```js
// GET /notifications
client.notifications(callback);

// GET /repos/:owner/:repo/notifications
client.repos('caarbon').repo('hub-o-matic').notifications(callback);

// PUT /notifications
client.notifications().put(callback);

// PUT /repos/:owner/:repo/notifications
client.repos('caarbon').repo('hub-o-matic').notifications().put(callback);

// GET /notifications/threads/:id
client.notifications().threads(63832640, callback);

// PATCH /notifications/threads/:id
client.notifications().threads(63832640, callback).patch(callback);

// GET /notifications/threads/:id/subscription
client.notifications().threads(63832640).subscription(callback);

// PUT /notifications/threads/:id/subscription
client.notifications().threads(63832640).subscription().put(data, callback);

// DELETE /notifications/threads/:id/subscription
client.notifications().threads(63832640).subscription().delete(callback);
```

#### [Starring](https://developer.github.com/v3/activity/starring/)

```js
// GET /repos/:owner/:repo/stargazers
client.repos('caarbon').repo('hub-o-matic').stargazers(callback);

// GET /users/:username/starred
client.users('tmarshall').starred(callback);

// GET /user/starred
client.user().starred(callback);

// GET /user/starred/:owner/:repo
client.user().starred('tmarshall').repo('hub-o-matic', callback);

// PUT /user/starred/:owner/:repo
client.user().starred('tmarshall').repo('hub-o-matic').put(callback);

// DELETE /user/starred/:owner/:repo
client.user().starred('tmarshall').repo('hub-o-matic').delete(callback);
```

#### [Watching](https://developer.github.com/v3/activity/watching/)

```js
// GET /repos/:owner/:repo/subscribers
client.repos('caarbon').repo('hub-o-matic').subscribers(callback);

// GET /users/:username/subscriptions
client.users('tmarshall').subscriptions(callback);

// GET /user/subscriptions
client.user().subscriptions(callback);

// GET /repos/:owner/:repo/subscription
client.repos('caarbon').repo('hub-o-matic').subscription(callback);

// PUT /repos/:owner/:repo/subscription
client.repos('caarbon').repo('hub-o-matic').subscription.put(callback);

// DELETE /repos/:owner/:repo/subscription
client.repos('caarbon').repo('hub-o-matic').subscription.delete(callback);

// GET /user/subscriptions/:owner/:repo
client.user().subscriptions('tmarshall').repo('hub-o-matic', callback);

// PUT /user/subscriptions/:owner/:repo
client.user().subscriptions('tmarshall').repo('hub-o-matic').put(callback);
```

### [Gists](https://developer.github.com/v3/gists/)

```js
// GET /users/:username/gists
client.users('tmarshall').gists(callback);

// GET /gists
client.gists(callback);

// GET /gists/public
client.gists.public(callback);

// GET /gists/starred
client.gists.starred(callback);

// GET /gists/:id
client.gists('6149ed2475f964cda3f5', callback);

// GET /gists/:id/:sha
client.gists('6149ed2475f964cda3f5').sha('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// POST /gists
client.gists().post(data, callback);

// PATCH /gists/:id
client.gists('6149ed2475f964cda3f5').patch(data, callback);

// GET /gists/:id/commits
client.gists('6149ed2475f964cda3f5').commits(callback);

// PUT /gists/:id/star
client.gists('6149ed2475f964cda3f5').star().put(callback);

// DELETE /gists/:id/star
client.gists('6149ed2475f964cda3f5').star().delete(callback);

// GET /gists/:id/star
client.gists('6149ed2475f964cda3f5').star(callback);

// POST /gists/:id/forks
client.gists('6149ed2475f964cda3f5').forks().post(callback);

// GET /gists/:id/forks
client.gists('6149ed2475f964cda3f5').forks(callback);

// DELETE /gists/:id
client.gists('6149ed2475f964cda3f5').delete(callback);
```

#### [Comments](https://developer.github.com/v3/gists/comments/)

```js
// GET /gists/:gist_id/comments
client.gists('6149ed2475f964cda3f5').comments(callback);

// GET /gists/:gist_id/comments/:id
client.gists('6149ed2475f964cda3f5').comments(862438, callback);

// POST /gists/:gist_id/comments
client.gists('6149ed2475f964cda3f5').comments().post(data, callback);

// PATCH /gists/:gist_id/comments/:id
client.gists('6149ed2475f964cda3f5').comments(862438).patch(data, callback);

// DELETE /gists/:gist_id/comments/:id
client.gists('6149ed2475f964cda3f5').comments(862438).delete(callback);
```

### [Git Data](https://developer.github.com/v3/git/)

#### [Blobs](https://developer.github.com/v3/git/blobs/)

```js
// GET /repos/:owner/:repo/git/blobs/:sha
client.repos('caarbon').repo('hub-o-matic').git().blobs().sha('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// POST /repos/:owner/:repo/git/blobs
client.repos('caarbon').repo('hub-o-matic').git().blobs().post(data, callback);
```

#### [Commits](https://developer.github.com/v3/git/commits/)

```js
// GET /repos/:owner/:repo/git/commits/:sha
client.repos('caarbon').repo('hub-o-matic').git().commits().sha('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// POST /repos/:owner/:repo/git/commits
client.repos('caarbon').repo('hub-o-matic').git().commits().post(data, callback);
```

#### [References](https://developer.github.com/v3/git/refs/)

```js
// GET /repos/:owner/:repo/git/refs/:ref
client.repos('caarbon').repo('hub-o-matic').git().refs('skunkworkz/feature', callback);

// GET /repos/:owner/:repo/git/refs
client.repos('caarbon').repo('hub-o-matic').git().refs(callback);

// GET /repos/:owner/:repo/git/refs/tags
client.repos('caarbon').repo('hub-o-matic').git().refs().tags(callback);

// POST /repos/:owner/:repo/git/refs
client.repos('caarbon').repo('hub-o-matic').git().refs().post(data, callback);

// PATCH /repos/:owner/:repo/git/refs/:ref
client.repos('caarbon').repo('hub-o-matic').git().refs('skunkworkz/feature').patch(data, callback);

// DELETE /repos/:owner/:repo/git/refs/:ref
client.repos('caarbon').repo('hub-o-matic').git().refs('skunkworkz/feature').delete(callback);

// DELETE /repos/:owner/:repo/git/refs/tags/:id
client.repos('caarbon').repo('hub-o-matic').git().refs().tags(862438).delete(callback);
```
