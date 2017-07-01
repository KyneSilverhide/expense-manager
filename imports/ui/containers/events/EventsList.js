import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Events from '../../../api/events/event.model.js';
import EventsList from '../../components/events/EventsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('my.events.list');

  if (subscription.ready()) {
    const events = Events.find().fetch();
    onData(null, { events, showCompleted: params.showCompleted });
  }
};

export default composeWithTracker(composer, Loading)(EventsList);
