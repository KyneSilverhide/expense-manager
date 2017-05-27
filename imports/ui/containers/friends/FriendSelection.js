import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Friends from '../../../api/friends/friend.model.js';
import FriendSelection from '../../components/friends/FriendSelection.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('my.friends.list');
  if (subscription.ready()) {
    const friends = Friends.find().fetch();
    onData(null, { friends, onAdd: params.onAdd, selectedFriends: params.selectedFriends });
  }
};

export default composeWithTracker(composer, Loading)(FriendSelection);
