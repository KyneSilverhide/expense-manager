import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AppNavigation from '../components/AppNavigation.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('users.list');
  if (subscription.ready()) {
    console.log('READY');
    const user = Meteor.users.findOne(Meteor.userId());
    console.log('CONTAINER USER', user);
    onData(null, { hasUser: Meteor.user() });
  } else {
    onData(null, { hasUser: Meteor.user() });
  }
};

export default composeWithTracker(composer)(AppNavigation);
