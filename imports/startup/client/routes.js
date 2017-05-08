import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import Friends from '../../ui/pages/friends/Friends.js';
import NewFriend from '../../ui/pages/friends/NewFriend.js';
import EditFriend from '../../ui/containers/friends/EditFriend.js';
import Events from '../../ui/pages/events/Events.js';
import NewEvent from '../../ui/pages/events/NewEvent.js';
import EditEvent from '../../ui/containers/events/EditEvent.js';
import NotFound from '../../ui/pages/NotFound.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute name="index" component={Index} onEnter={authenticate} />
        <Route name="login" path="/login" component={Login} />
        <Route name="friends" path="/friends" component={Friends} onEnter={authenticate} />
        <Route name="events" path="/events" component={Events} onEnter={authenticate} />
        <Route name="newFriend" path="/friends/new" component={NewFriend} onEnter={authenticate} />
        <Route name="newEvent" path="/events/new" component={NewEvent} onEnter={authenticate} />
        <Route
          name="editFriend"
          path="/friends/:_id/edit"
          component={EditFriend}
          onEnter={authenticate}
        />
        <Route
          name="editEvent"
          path="/events/:_id/edit"
          component={EditEvent}
          onEnter={authenticate}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
