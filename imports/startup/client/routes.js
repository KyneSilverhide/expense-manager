import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
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
      <IndexRoute name="index" component={Index} onEnter={authenticate}/>
      <Route name="login" path="/login" component={Login}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>, document.getElementById('react-root'));
});
