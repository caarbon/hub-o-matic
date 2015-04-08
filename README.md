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

### Activity

#### Events

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

#### Feeds

```js
// GET /feeds
client.feeds(callback);
```

#### Notifications

```js
// GET /notifications
client.notifications(callback);

// GET /repos/:owner/:repo/notifications
client.repos('caarbon').repo('hub-o-matic').notifications(callback);

// PUT /notifications
client.notifications().put(null, callback);

// PUT /repos/:owner/:repo/notifications
client.repos('caarbon').repo('hub-o-matic').notifications().put(null, callback);

// GET /notifications/threads/:id
client.notifications().threads('threadid', callback);

// PATCH /notifications/threads/:id
client.notifications().threads('threadid', callback).patch(null, callback);

// GET /notifications/threads/:id/subscription
client.notifications().threads('threadid').subscription(callback);

// PUT /notifications/threads/:id/subscription
client.notifications().threads('threadid').subscription().put(data, callback);

// DELETE /notifications/threads/:id/subscription
client.notifications().threads('threadid').subscription().delete(data, callback);
```
