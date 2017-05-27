/* eslint-disable no-confusing-arrow */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Layout from 'material-ui/Layout';
import Typography from 'material-ui/Typography';
import { sortByMail } from '../../../modules/sorting.js';

function indexOfById(friends, friend) {
  for (let i = 0, len = friends.length; i < len; i += 1) {
    if (friends[i]._id === friend._id) {
      return i;
    }
  }
  return -1;
}

function friendIsSelected(friend, selectedFriends) {
  return indexOfById(selectedFriends, friend) < 0;
}

function renderFriends(onAdd, friends, selectedFriends) {
  return friends.length > 0
    ? <List dense={true}>
        {friends.sort(sortByMail).map(friend => (
          <ListItem key={friend._id}>
            <ListItemText primary={`${friend.firstname} ${friend.lastname}`} />
            <ListItemSecondaryAction>
              {friendIsSelected(friend, selectedFriends) &&
                <IconButton onClick={() => onAdd(friend)}>
                  <FontAwesome name="plus" />
                </IconButton>}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    : <List><ListItem>You don't have any friends...yet</ListItem></List>;
}

const FriendSelection = ({ onAdd, friends, selectedFriends }) => (
  <Layout container>
    <Layout item>
      <Typography type="subheading">
        Please select friends who participed in this expense
      </Typography>
      {renderFriends(onAdd, friends, selectedFriends)}
    </Layout>
  </Layout>
);
FriendSelection.propTypes = {
  onAdd: React.PropTypes.func,
  friends: React.PropTypes.array,
  selectedFriends: React.PropTypes.array,
};

export default FriendSelection;
