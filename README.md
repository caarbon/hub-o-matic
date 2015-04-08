# Hub-o-Matic

Hub-o-Matic is a Node wrapper for the GitHub V3 API.

## Usage

```js
var HubOMatic = require('hub-o-matic');
var client = HubOMatic(process.env.GITHUB_TOKEN);
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
```
