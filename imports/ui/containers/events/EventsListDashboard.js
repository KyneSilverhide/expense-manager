import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Events from '../../../api/events/event.model.js';
import Friends from '../../../api/friends/friend.model';
import EventsListDashboard from '../../components/events/EventsListDashboard';
import Loading from '../../components/Loading';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('my.events.list.ongoing');

  if (subscription.ready()) {
    const events = Events.find().fetch();
    const userAsFriend = Friends.findOne({
      userId: Meteor.userId(),
      ownerId: Meteor.userId(),
    });
    onData(null, { events, userAsFriend });
  }
};

export default composeWithTracker(composer, Loading)(EventsListDashboard);
