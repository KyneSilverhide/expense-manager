/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { remove as removeDiacritics } from 'diacritics';
import Button from 'material-ui/Button';
import friendEditor from './friend-editor.js';

const backToList = () => {
  browserHistory.push('/friends');
};

const updateMail = () => {
  const firstname = $('[name="firstname"]').val();
  const lastname = $('[name="lastname"]').val();
  const email = $('[name="email"]').val();
  if (email.trim() === '' && firstname && lastname) {
    const lowerFirstName = removeDiacritics(firstname.toLowerCase());
    const lowerLastName = removeDiacritics(lastname.toLowerCase());
    const expectedMail = `${lowerFirstName}.${lowerLastName}@${Meteor.settings.public.friend.preferred_mail_suffix}`;
    $('[name="email"]').val(expectedMail);
  }
};

export default class FriendEditor extends React.Component {
  componentDidMount() {
    friendEditor({ component: this });
    setTimeout(
      () => {
        document.querySelector('[name="firstname"]').focus();
      },
      0,
    );
  }

  render() {
    const { friend } = this.props;
    return (
      <form
        key={friend && friend._id}
        ref={form => this.friendEditorForm = form}
        onSubmit={event => event.preventDefault()}
      >
        <FormControl>
          <InputLabel htmlFor="firstname">
            First name
          </InputLabel>
          <Input id="firstname" name="firstname" defaultValue={friend && friend.firstname} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastname">
            Last name
          </InputLabel>
          <Input id="lastname" name="lastname" defaultValue={friend && friend.lastname} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">
            Email
          </InputLabel>
          <Input
            id="email"
            name="email"
            defaultValue={friend && friend.email}
            onFocus={() => updateMail()}
          />
        </FormControl>
        <Button raised primary onClick={() => backToList()}>
          <FontAwesome name="undo" />&nbsp;Cancel
        </Button>
        &nbsp;
        <Button raised primary type="submit">
          <FontAwesome name="floppy-o" />&nbsp;{friend && friend._id ? 'Save' : 'Add'}
        </Button>
      </form>
    );
  }
}

FriendEditor.propTypes = {
  friend: React.PropTypes.object,
};
