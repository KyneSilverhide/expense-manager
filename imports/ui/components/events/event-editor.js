import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertEvent } from '../../../api/events/event.methods.js';
import '../../../modules/validation.js';

let component;

const handleUpsert = () => {
  const { event } = component.props;
  const confirmation = event && event._id ? 'Event has been updated' : 'Event has been added';
  const upsert = {
    name: $('[name="name"]').val().trim(),
    date: new Date($('[name="date"]').val().trim()),
    completed: $('[name="completed"]').val() === 'true',
    expenses: [],
    ownerId: Meteor.userId(),
  };
  if (event && event._id) {
    upsert._id = event._id;
  }

  upsertEvent.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.eventEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/events');
    }
  });
};

const validate = () => {
  $(component.eventEditorForm).validate({
    rules: {
      name: {
        required: true,
      },
      date: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Event name is mandatory',
      },
      date: {
        required: 'Event date is mandatory',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function eventEditor(options) {
  component = options.component;
  validate();
}
