import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Friends from '../../../api/friends/friend.model.js';
import Events from '../../../api/events/event.model.js';
import Debts from '../../components/debts/Debts.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const friendSub = Meteor.subscribe('my.friends.list');
  const eventSub = Meteor.subscribe('my.events.list.ongoing');
  const userSub = Meteor.subscribe('friends.me');

  if (friendSub.ready() && eventSub.ready() && userSub.ready()) {
    const friends = Friends.find().fetch();
    const events = Events.find().fetch();
    const userAsFriend = Friends.findOne({
      userId: Meteor.userId(),
      ownerId: Meteor.userId(),
    });
    onData(null, { friends, events, userAsFriend });
  }
};

export default composeWithTracker(composer, Loading)(Debts);
