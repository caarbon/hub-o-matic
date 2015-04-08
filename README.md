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

#### [Tags](https://developer.github.com/v3/git/tags/)

```js
// GET /repos/:owner/:repo/git/tags/:sha
client.repos('caarbon').repo('hub-o-matic').git().tags().sha('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// POST /repos/:owner/:repo/git/tags
client.repos('caarbon').repo('hub-o-matic').git().tags().post(callback);
```

#### [Trees](https://developer.github.com/v3/git/trees/)

```js
// GET /repos/:owner/:repo/git/trees/:sha
client.repos('caarbon').repo('hub-o-matic').git().trees().sha('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// GET /repos/:owner/:repo/git/trees/:sha?recursive=1
client.repos('caarbon').repo('hub-o-matic').git().trees().sha('2c92055c4467fe31bd321f6295ad6953b6f1f977').get({ recursive: 1 }, callback);

// POST /repos/:owner/:repo/git/trees
client.repos('caarbon').repo('hub-o-matic').git().trees().post(data, callback);
```

### [Issues](https://developer.github.com/v3/issues/)

```js
// GET /issues
client.issues(callback);

// GET /user/issues
client.user().issues(callback);

// GET /orgs/:org/issues
client.orgs('caarbon').issues(callback);

// GET /repos/:owner/:repo/issues
client.repos('caarbon').repo('hub-o-matic').issues(callback);

// GET /repos/:owner/:repo/issues/:number
client.repos('caarbon').repo('hub-o-matic').issues(456, callback);

// POST /repos/:owner/:repo/issues
client.repos('caarbon').repo('hub-o-matic').issues().post(data, callback);

// PATCH /repos/:owner/:repo/issues/:number
client.repos('caarbon').repo('hub-o-matic').issues(456).patch(data, callback);
```

#### [Assignees](https://developer.github.com/v3/issues/assignees/)

```js
// GET /repos/:owner/:repo/assignees
client.repos('caarbon').repo('hub-o-matic').assignees(callback);

// GET /repos/:owner/:repo/assignees/:assignee
client.repos('caarbon').repo('hub-o-matic').assignees('tmarshall', callback);
```

#### [Comments](https://developer.github.com/v3/issues/comments/)

```js
// GET /repos/:owner/:repo/issues/:number/comments
client.repos('caarbon').repo('hub-o-matic').issues(456).comments(callback);

// GET /repos/:owner/:repo/issues/comments
client.repos('caarbon').repo('hub-o-matic').issues().comments(callback);

// GET /repos/:owner/:repo/issues/comments/:id
client.repos('caarbon').repo('hub-o-matic').issues().comments(436201, callback);

// POST /repos/:owner/:repo/issues/:number/comments
client.repos('caarbon').repo('hub-o-matic').issues(456).comments().post(data, callback);

// PATCH /repos/:owner/:repo/issues/comments/:id
client.repos('caarbon').repo('hub-o-matic').issues().comments(436201).patch(data, callback);

// DELETE /repos/:owner/:repo/issues/comments/:id
client.repos('caarbon').repo('hub-o-matic').issues().comments(436201).delete(callback);
```

#### [Events](https://developer.github.com/v3/issues/events/)

```js
// GET /repos/:owner/:repo/issues/:issue_number/events
client.repos('caarbon').repo('hub-o-matic').issues(456).events(callback);

// GET /repos/:owner/:repo/issues/events
client.repos('caarbon').repo('hub-o-matic').issues().events(callback);

// GET /repos/:owner/:repo/issues/events/:id
client.repos('caarbon').repo('hub-o-matic').issues().events(8284205, callback);
```

#### [Labels](https://developer.github.com/v3/issues/labels/)

```js
// GET /repos/:owner/:repo/labels
client.repos('caarbon').repo('hub-o-matic').labels(callback);

// GET /repos/:owner/:repo/labels/:name
client.repos('caarbon').repo('hub-o-matic').labels('P0', callback);

// POST /repos/:owner/:repo/labels
client.repos('caarbon').repo('hub-o-matic').labels().post(data, callback);

// PATCH /repos/:owner/:repo/labels/:name
client.repos('caarbon').repo('hub-o-matic').labels('P0').patch(data, callback);

// DELETE /repos/:owner/:repo/labels/:name
client.repos('caarbon').repo('hub-o-matic').labels('P0').delete(callback);

// GET /repos/:owner/:repo/issues/:number/labels
client.repos('caarbon').repo('hub-o-matic').issues(456).labels(callback);

// POST /repos/:owner/:repo/issues/:number/labels
client.repos('caarbon').repo('hub-o-matic').issues(456).labels().post(data, callback);

// DELETE /repos/:owner/:repo/issues/:number/labels/:name
client.repos('caarbon').repo('hub-o-matic').issues(456).labels('P0').delete(callback);

// PUT /repos/:owner/:repo/issues/:number/labels
client.repos('caarbon').repo('hub-o-matic').issues(456).labels().put(data, callback);

// DELETE /repos/:owner/:repo/issues/:number/labels
client.repos('caarbon').repo('hub-o-matic').issues(456).labels().delete(callback);

// GET /repos/:owner/:repo/milestones/:number/labels
client.repos('caarbon').repo('hub-o-matic').milestones(8420).labels(callback);
```

#### [Milestones](https://developer.github.com/v3/issues/milestones/)

```js
// GET /repos/:owner/:repo/milestones
client.repos('caarbon').repo('hub-o-matic').milestones(callback);

// GET /repos/:owner/:repo/milestones/:number
client.repos('caarbon').repo('hub-o-matic').milestones(8420, callback);

// POST /repos/:owner/:repo/milestones
client.repos('caarbon').repo('hub-o-matic').milestones().post(data, callback);

// PATCH /repos/:owner/:repo/milestones/:number
client.repos('caarbon').repo('hub-o-matic').milestones(8420).patch(data, callback);

// DELETE /repos/:owner/:repo/milestones/:number
client.repos('caarbon').repo('hub-o-matic').milestones(8420).delete(callback);
```

### [Miscellaneous](https://developer.github.com/v3/misc/)

#### [Emojis](https://developer.github.com/v3/emojis/)

```js
// GET /emojis
client.emojis(callback);
```

#### [Gitignore](https://developer.github.com/v3/gitignore/)

```js
// GET /gitignore/templates
client.gitignore().templates(callback);

// GET /gitignore/templates/C
client.gitignore().templates('C', callback);
```

#### [Licenses](https://developer.github.com/v3/licenses/)

```js
// GET /licenses
client.licenses(callback);

// GET /licenses/mit
client.licenses('mit', callback);

// GET /repos/:owner/:repo
client.repos('caarbon').repo('hub-o-matic', callback);
```

#### [Markdown](https://developer.github.com/v3/markdown/)

```js
// POST /markdown
client.markdown().post(data, callback);

// POST /markdown/raw
client.markdown('raw').post(data, callback);
```

#### [Meta](https://developer.github.com/v3/meta/)

```js
// GET /meta
client.meta(callback);
```

#### [Rate Limit](https://developer.github.com/v3/rate_limit/)

```js
// GET /rate_limit
client.rateLimit(callback);
```

### [Organizations](https://developer.github.com/v3/orgs/)

```js
// GET /user/orgs
client.user().orgs(callback);

// GET /users/:username/orgs
client.user('tmarshall').orgs(callback);

// GET /orgs/:org
client.orgs('caarbon', callback);

// PATCH /orgs/:org
client.orgs('caarbon').patch(data, callback);
```

#### [Members](https://developer.github.com/v3/orgs/members/)

```js
// GET /orgs/:org/members
client.orgs('caarbon').members(callback);

// GET /orgs/:org/members/:username
client.orgs('caarbon').members('tmarshall', callback);

// DELETE /orgs/:org/members/:username
client.orgs('caarbon').members('tmarshall').delete(callback);

// GET /orgs/:org/public_members
client.orgs('caarbon').publicMembers(callback);

// GET /orgs/:org/public_members/:username
client.orgs('caarbon').publicMembers('tmarshall', callback);

// PUT /orgs/:org/public_members/:username
client.orgs('caarbon').publicMembers('tmarshall').put(callback);

// DELETE /orgs/:org/public_members/:username
client.orgs('caarbon').publicMembers('tmarshall').delete(callback);

// GET /orgs/:org/memberships/:username
client.orgs('caarbon').memberships('tmarshall', callback);

// PUT /orgs/:org/memberships/:username
client.orgs('caarbon').memberships('tmarshall').put(data, callback);

// DELETE /orgs/:org/memberships/:username
client.orgs('caarbon').memberships('tmarshall').delete(callback);

// GET /user/memberships/orgs
client.user().memberships().orgs(callback);

// GET /user/memberships/orgs/:org
client.user().memberships().orgs('caarbon', callback);

// PATCH /user/memberships/orgs/:org
client.user().memberships().orgs('caarbon').patch(data, callback);
```

#### [Teams](https://developer.github.com/v3/orgs/teams/)

```js
// GET /orgs/:org/teams
client.orgs('caarbon').teams(callback);

// GET /teams/:id
client.orgs('caarbon').teams(2502, callback);

// POST /orgs/:org/teams
client.orgs('caarbon').teams().post(data, callback);

// PATCH /teams/:id
client.teams(2502).patch(data, callback);

// DELETE /teams/:id
client.teams(2502).delete(callback);

// GET /teams/:id/members
client.teams(2502).members(callback);

// GET /teams/:id/members/:username
client.teams(2502).members('tmarshall', callback);

// PUT /teams/:id/members/:username
client.teams(2502).members('tmarshall').put(callback);

// DELETE /teams/:id/members/:username
client.teams(2502).members('tmarshall').delete(callback);

// PUT /teams/:id/memberships/:username
client.teams(2502).memberships('tmarshall').put(callback);

// DELETE /teams/:id/memberships/:username
client.teams(2502).memberships('tmarshall').delete(callback);

// GET /teams/:id/repos
client.teams(2502).repos(callback);

// GET /teams/:id/repos/:owner/:repo
client.teams(2502).repos('caarbon').repo('hub-o-matic', callback);

// PUT /teams/:id/repos/:org/:repo
client.teams(2502).repos('caarbon').repo('hub-o-matic').put(callback);

// DELETE /teams/:id/repos/:owner/:repo
client.teams(2502).repos('caarbon').repo('hub-o-matic').delete(callback);

// GET /user/teams
client.user().teams(callback);
```

#### [Webhooks](https://developer.github.com/v3/orgs/hooks/)

```js
// GET /orgs/:org/hooks
client.orgs('caarbon').hooks(callback);

// GET /orgs/:org/hooks/:id
client.orgs('caarbon').hooks(7427, callback);

// POST /orgs/:org/hooks
client.orgs('caarbon').hooks().post(data, callback);

// PATCH /orgs/:org/hooks/:id
client.orgs('caarbon').hooks(7427).patch(data, callback);

// POST /orgs/:org/hooks/:id/pings
client.orgs('caarbon').hooks(7427).post(callback);

// DELETE /orgs/:org/hooks/:id
client.orgs('caarbon').hooks(7427).delete(callback);
```

### [Pull Requests](https://developer.github.com/v3/pulls/)

```js
// GET /repos/:owner/:repo/pulls
client.repos('caarbon').repo('hub-o-matic').pulls(callback);

// GET /repos/:owner/:repo/pulls/:number
client.repos('caarbon').repo('hub-o-matic').pulls(28, callback);

// POST /repos/:owner/:repo/pulls
client.repos('caarbon').repo('hub-o-matic').pulls().post(data, callback);

// PATCH /repos/:owner/:repo/pulls/:number
client.repos('caarbon').repo('hub-o-matic').pulls(28).patch(data, callback);

// GET /repos/:owner/:repo/pulls/:number/commits
client.repos('caarbon').repo('hub-o-matic').pulls(28).commits(callback);

// GET /repos/:owner/:repo/pulls/:number/files
client.repos('caarbon').repo('hub-o-matic').pulls(28).files(callback);

// GET /repos/:owner/:repo/pulls/:number/merge
client.repos('caarbon').repo('hub-o-matic').pulls(28).merge(callback);

// PUT /repos/:owner/:repo/pulls/:number/merge
client.repos('caarbon').repo('hub-o-matic').pulls(28).merge().put(data, callback);
```

#### [Review Comments](https://developer.github.com/v3/pulls/comments/)

```js
// GET /repos/:owner/:repo/pulls/:number/comments
client.repos('caarbon').repo('hub-o-matic').pulls(28).comments(callback);

// GET /repos/:owner/:repo/pulls/comments
client.repos('caarbon').repo('hub-o-matic').pulls().comments(callback);

// GET /repos/:owner/:repo/pulls/comments/:number
client.repos('caarbon').repo('hub-o-matic').pulls().comments(2821, callback);

// POST /repos/:owner/:repo/pulls/:number/comments
client.repos('caarbon').repo('hub-o-matic').pulls(28).comments().post(data, callback);

// PATCH /repos/:owner/:repo/pulls/comments/:number
client.repos('caarbon').repo('hub-o-matic').pulls().comments(2821).patch(data, callback);

// DELETE /repos/:owner/:repo/pulls/comments/:number
client.repos('caarbon').repo('hub-o-matic').pulls().comments(2821).delete(callback);
```

### [Repositories](https://developer.github.com/v3/repos/)

```js
// GET /user/repos
client.user().repos(callback);

// GET /users/:username/repos
client.users('tmarshall').repos(callback);

// GET /orgs/:org/repos
client.orgs('caarbon').repos(callback);

// GET /repositories
client.repositories(callback);

// POST /user/repos
client.user().repos().post(data, callback);

// POST /orgs/:org/repos
client.orgs('caarbon').repos().post(data, callback);

// GET /repos/:owner/:repo
client.repos('caarbon').repo('hub-o-matic', callback);

// PATCH /repos/:owner/:repo
client.repos('caarbon').repo('hub-o-matic').patch(callback);

// GET /repos/:owner/:repo/contributors
client.repos('caarbon').repo('hub-o-matic').contributors(callback);

// GET /repos/:owner/:repo/languages
client.repos('caarbon').repo('hub-o-matic').languages(callback);

// GET /repos/:owner/:repo/teams
client.repos('caarbon').repo('hub-o-matic').teams(callback);

// GET /repos/:owner/:repo/tags
client.repos('caarbon').repo('hub-o-matic').tags(callback);

// GET /repos/:owner/:repo/branches
client.repos('caarbon').repo('hub-o-matic').branches(callback);

// GET /repos/:owner/:repo/branches/:branch
client.repos('caarbon').repo('hub-o-matic').branches('fix/things', callback);

// DELETE /repos/:owner/:repo
client.repos('caarbon').repo('hub-o-matic').delete(callback);
```

#### [Collaborators](https://developer.github.com/v3/repos/collaborators/)

```js
// GET /repos/:owner/:repo/collaborators
client.repos('caarbon').repo('hub-o-matic').collaborators(callback);

// GET /repos/:owner/:repo/collaborators/:username
client.repos('caarbon').repo('hub-o-matic').collaborators('tmarshall', callback);

// PUT /repos/:owner/:repo/collaborators/:username
client.repos('caarbon').repo('hub-o-matic').collaborators('tmarshall').put(callback);

// DELETE /repos/:owner/:repo/collaborators/:username
client.repos('caarbon').repo('hub-o-matic').collaborators('tmarshall').delete(callback);
```

#### [Comments](https://developer.github.com/v3/repos/comments/)

```js
// GET /repos/:owner/:repo/comments
client.repos('caarbon').repo('hub-o-matic').comments(callback);

// GET /repos/:owner/:repo/commits/:ref/comments
client.repos('caarbon').repo('hub-o-matic').commits('2c92055c4467fe31bd321f6295ad6953b6f1f977').comments(callback);

// POST /repos/:owner/:repo/commits/:sha/comments
client.repos('caarbon').repo('hub-o-matic').commits('2c92055c4467fe31bd321f6295ad6953b6f1f977').comments().post(data, callback);

// GET /repos/:owner/:repo/comments/:id
client.repos('caarbon').repo('hub-o-matic').comments(862438, callback);

// PATCH /repos/:owner/:repo/comments/:id
client.repos('caarbon').repo('hub-o-matic').comments(862438).patch(data, callback);

// DELETE /repos/:owner/:repo/comments/:id
client.repos('caarbon').repo('hub-o-matic').comments(862438).delete(callback);
```

#### [Commits](https://developer.github.com/v3/repos/commits/)

```js
// GET /repos/:owner/:repo/commits
client.repos('caarbon').repo('hub-o-matic').commits(callback);

// GET /repos/:owner/:repo/commits/:sha
client.repos('caarbon').repo('hub-o-matic').commits('2c92055c4467fe31bd321f6295ad6953b6f1f977', callback);

// GET /repos/:owner/:repo/compare/:base...:head
client.repos('caarbon').repo('hub-o-matic').compare(':base...:head', callback);
```

#### [Contents](https://developer.github.com/v3/repos/contents/)

```js
// GET /repos/:owner/:repo/readme
client.repos('caarbon').repo('hub-o-matic').readme(callback);

// GET /repos/:owner/:repo/contents/:path
client.repos('caarbon').repo('hub-o-matic').contents('lib', callback);

// PUT /repos/:owner/:repo/contents/:path
client.repos('caarbon').repo('hub-o-matic').contents('lib').put(data, callback);

// PUT /repos/:owner/:repo/contents/:path
client.repos('caarbon').repo('hub-o-matic').contents('lib/index.js').put(data, callback);

// DELETE /repos/:owner/:repo/contents/:path
client.repos('caarbon').repo('hub-o-matic').contents('lib/index.js').delete(callback);

// GET /repos/:owner/:repo/:archive_format/:ref
client.repos('caarbon').repo('hub-o-matic').archiveFormat('tarball').ref('master', callback);
```

#### [Deploy Keys](https://developer.github.com/v3/repos/keys/)

```js
// GET /repos/:owner/:repo/keys
client.repos('caarbon').repo('hub-o-matic').keys(callback);

// GET /repos/:owner/:repo/keys/:id
client.repos('caarbon').repo('hub-o-matic').keys(8427, callback);

// POST /repos/:owner/:repo/keys
client.repos('caarbon').repo('hub-o-matic').keys().post(data, callback);

// DELETE /repos/:owner/:repo/keys/:id
client.repos('caarbon').repo('hub-o-matic').keys(8427).delete(callback);
```

#### [Deployments](https://developer.github.com/v3/repos/deployments/)

```js
// GET /repos/:owner/:repo/deployments
client.repos('caarbon').repo('hub-o-matic').deployments(callback);

// POST /repos/:owner/:repo/deployments
client.repos('caarbon').repo('hub-o-matic').deployments().post(data, callback);

// GET /repos/:owner/:repo/deployments/:id/statuses
client.repos('caarbon').repo('hub-o-matic').deployments(173343).statuses(callback);

// POST /repos/:owner/:repo/deployments/:id/statuses
client.repos('caarbon').repo('hub-o-matic').deployments(173343).statuses().post(data, callback);
```

#### [Downloads](https://developer.github.com/v3/repos/downloads/)

```js
// GET /repos/:owner/:repo/downloads
client.repos('caarbon').repo('hub-o-matic').downloads(callback);

// GET /repos/:owner/:repo/downloads/:id
client.repos('caarbon').repo('hub-o-matic').downloads(9429211, callback);

// DELETE /repos/:owner/:repo/downloads/:id
client.repos('caarbon').repo('hub-o-matic').downloads(9429211).delete(callback);
```

#### [Forks](https://developer.github.com/v3/repos/forks/)

```js
// GET /repos/:owner/:repo/forks
client.repos('caarbon').repo('hub-o-matic').forks(callback);

// POST /repos/:owner/:repo/forks
client.repos('caarbon').repo('hub-o-matic').forks().post(data, callback);
```

#### [Merging](https://developer.github.com/v3/repos/merging/)

```js
// POST /repos/:owner/:repo/merges
client.repos('caarbon').repo('hub-o-matic').merges().post(data, callback);
```

#### [Pages](https://developer.github.com/v3/repos/pages/)

```js
// GET /repos/:owner/:repo/pages
client.repos('caarbon').repo('hub-o-matic').pages(callback);

// GET /repos/:owner/:repo/pages/builds
client.repos('caarbon').repo('hub-o-matic').pages().builds(callback);

// GET /repos/:owner/:repo/pages/builds/latest
client.repos('caarbon').repo('hub-o-matic').pages().builds('latest', callback);
```

#### [Releases](https://developer.github.com/v3/repos/releases/)

```js
// GET /repos/:owner/:repo/releases
client.repos('caarbon').repo('hub-o-matic').releases(callback);

// GET /repos/:owner/:repo/releases/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16', callback);

// GET /repos/:owner/:repo/releases/latest
client.repos('caarbon').repo('hub-o-matic').releases('latest', callback);

// GET /repos/:owner/:repo/releases/tags/:tag
client.repos('caarbon').repo('hub-o-matic').releases().tags('v1.2.16', callback);

// POST /repos/:owner/:repo/releases
client.repos('caarbon').repo('hub-o-matic').releases().post(data, callback);

// PATCH /repos/:owner/:repo/releases/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').patch(data, callback);

// DELETE /repos/:owner/:repo/releases/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').delete(callback);

// GET /repos/:owner/:repo/releases/:id/assets
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').assets(callback);

// GET /repos/:owner/:repo/releases/assets/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').assets(9420101, callback);

// PATCH /repos/:owner/:repo/releases/assets/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').assets(9420101).patch(data, callback);

// DELETE /repos/:owner/:repo/releases/assets/:id
client.repos('caarbon').repo('hub-o-matic').releases('v1.2.16').assets(9420101).delete(callback);
```

#### [Statistics](https://developer.github.com/v3/repos/statistics/)

```js
// GET /repos/:owner/:repo/stats/contributors
client.repos('caarbon').repo('hub-o-matic').stats().contributors(callback);

// GET /repos/:owner/:repo/stats/commit_activity
client.repos('caarbon').repo('hub-o-matic').stats().commitActivity(callback);

// GET /repos/:owner/:repo/stats/code_frequency
client.repos('caarbon').repo('hub-o-matic').stats().codeFrequency(callback);

// GET /repos/:owner/:repo/stats/participation
client.repos('caarbon').repo('hub-o-matic').stats().participation(callback);

// GET /repos/:owner/:repo/stats/punch_card
client.repos('caarbon').repo('hub-o-matic').stats().punchCard(callback);
```

#### [Statuses](https://developer.github.com/v3/repos/statuses/)

```js
// POST /repos/:owner/:repo/statuses/:sha
client.repos('caarbon').repo('hub-o-matic').statuses('2c92055c4467fe31bd321f6295ad6953b6f1f977').post(data, callback);

// GET /repos/:owner/:repo/commits/:ref/statuses
client.repos('caarbon').repo('hub-o-matic').commits('2c92055c4467fe31bd321f6295ad6953b6f1f977').statuses(callback);

// GET /repos/:owner/:repo/commits/:ref/status
client.repos('caarbon').repo('hub-o-matic').commits('2c92055c4467fe31bd321f6295ad6953b6f1f977').status(callback);
```
