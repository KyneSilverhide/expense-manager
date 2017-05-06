/* eslint-disable no-confusing-arrow */

import React from 'react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { removeFriend } from '../../../api/friends/friend.methods.js';
import { sortByMail } from '../../../modules/sorting.js';
import FriendAvatar from './FriendAvatar';

const handleEdit = (_id) => {
  browserHistory.push(`/friends/${_id}/edit`);
};

const handleRemove = (_id) => {
  removeFriend.call({ _id }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Friend has been removed', 'success');
      browserHistory.push('/friends');
    }
  });
};

const FriendsList = ({ friends }) =>
  friends.length > 0
    ? <List>
        {friends.sort(sortByMail).map(friend => (
          <ListItem button key={friend._id}>
            <FriendAvatar friend={friend} />
            <ListItemText
              inset
              primary={`${friend.firstname} ${friend.lastname}`}
              secondary={friend.email}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEdit(friend._id)}>
                <FontAwesome name="pencil" />
              </IconButton>&nbsp;
              <IconButton accent onClick={() => handleRemove(friend._id)}>
                <FontAwesome name="trash" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    : <List><ListItem>You don't have any friends...yet</ListItem></List>;

FriendsList.propTypes = {
  friends: React.PropTypes.array,
};

export default FriendsList;
