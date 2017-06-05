import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import {
  upsertFriend,
  linkCreatedFriendToExistingUser,
} from '../../../api/friends/friend.methods.js';
import '../../../modules/validation.js';

let component;

const linkFriendToUser = (upsert, insertedId) => {
  if (insertedId || (upsert && upsert._id)) {
    const newFriendId = insertedId || upsert._id;
    const data = {
      friendId: newFriendId,
      mail: upsert.email,
    };
    linkCreatedFriendToExistingUser.call(data, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  }
};

const handleUpsert = () => {
  const { friend } = component.props;
  const confirmation = friend && friend._id ? 'Friend has been updated' : 'Friend has been added';
  const upsert = {
    firstname: document.querySelector('[name="firstname"]').value.trim(),
    lastname: document.querySelector('[name="lastname"]').value.trim(),
    email: document.querySelector('[name="email"]').value.trim(),
    ownerId: Meteor.userId(),
  };

  if (friend && friend._id) {
    upsert._id = friend._id;
  }

  upsertFriend.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      linkFriendToUser(upsert, response.insertedId);

      component.friendEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/friends');
    }
  });
};

const validate = () => {
  $(component.friendEditorForm).validate({
    rules: {
      firstname: {
        required: true,
      },
      lastname: {
        required: true,
      },
      email: {
        required: true,
      },
    },
    messages: {
      firstname: {
        required: 'Firstname is mandatory',
      },
      lastname: {
        required: 'Lastname is mandatory',
      },
      email: {
        required: 'Email is mandatory',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function friendEditor(options) {
  component = options.component;
  validate();
}
