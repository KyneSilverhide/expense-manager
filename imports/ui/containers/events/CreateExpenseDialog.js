import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Friends from '../../../api/friends/friend.model.js';
import CreateExpenseDialog from '../../components/events/CreateExpenseDialog.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('friends.me');
  if (subscription.ready()) {
    const userAsFriend = Friends.findOne();
    onData(null, { userAsFriend, onSave: params.onSave, show: params.show });
  }
};

export default composeWithTracker(composer, Loading)(CreateExpenseDialog);
