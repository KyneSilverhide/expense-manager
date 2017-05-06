import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Friends from '../../../api/friends/friend.model.js';
import EditFriend from '../../pages/friends/EditFriend.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('friends.view', params._id);

  if (subscription.ready()) {
    const friend = Friends.findOne();
    onData(null, { friend });
  }
};

export default composeWithTracker(composer, Loading)(EditFriend);
