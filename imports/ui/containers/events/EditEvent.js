import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Events from '../../../api/events/event.model.js';
import EditEvent from '../../pages/events/EditEvent.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('events.view', params._id);

  if (subscription.ready()) {
    const event = Events.findOne();
    onData(null, { event });
  }
};

export default composeWithTracker(composer, Loading)(EditEvent);
