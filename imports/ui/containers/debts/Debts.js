import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Friends from '../../../api/friends/friend.model';
import Events from '../../../api/events/event.model';
import Debts from '../../components/debts/Debts';
import Loading from '../../components/Loading';
import { isFriendMailInList } from '../../../modules/debt-utils.js';

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
    for (const event of events) {
      for (const expense of event.expenses) {
        for (const friend of expense.friends) {
          if (!isFriendMailInList(friends, friend)) {
            friends.push(friend);
          }
        }
      }
    }
    onData(null, { friends, events, userAsFriend });
  }
};

export default composeWithTracker(composer, Loading)(Debts);
