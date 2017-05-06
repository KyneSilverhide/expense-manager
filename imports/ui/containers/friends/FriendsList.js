import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Friends from '../../../api/friends/friend.model.js';
import FriendsList from '../../components/friends/FriendsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('my.friends.list');

  if (subscription.ready()) {
    const friends = Friends.find().fetch();
    onData(null, { friends });
  }
};

export default composeWithTracker(composer, Loading)(FriendsList);
