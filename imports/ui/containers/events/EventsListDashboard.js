import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Events from '../../../api/events/event.model.js';
import Friends from '../../../api/friends/friend.model';
import EventsListDashboard from '../../components/events/EventsListDashboard';
import Loading from '../../components/Loading';

const composer = (params, onData) => {
  const eventSub = Meteor.subscribe('my.events.list.ongoing');
  const friendSub = Meteor.subscribe('my.friends.list');

  if (eventSub.ready() && friendSub.ready()) {
    const events = Events.find().fetch();
    const userAsFriend = Friends.findOne({
      userId: Meteor.userId(),
      ownerId: Meteor.userId(),
    });
    onData(null, { events, userAsFriend });
  }
};

export default composeWithTracker(composer, Loading)(EventsListDashboard);
