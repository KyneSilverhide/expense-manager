/* eslint-disable no-confusing-arrow */

import React from 'react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { removeFriend } from '../../../api/friends/friend.methods.js';
import { sortByMail } from '../../../modules/sorting.js';
import FriendAvatar from './FriendAvatar';

const handleEdit = (_id) => {
  browserHistory.push(`/friends/${_id}/edit`);
};

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteDialog: false, selectedFriend: null };
  }

  showDeleteDialog(friend) {
    this.setState({ showDeleteDialog: true, selectedFriend: friend });
  }

  closeDeleteDialog() {
    this.setState({ showDeleteDialog: false });
  }

  handleRemove() {
    if (this.state.selectedFriend) {
      removeFriend.call({ _id: this.state.selectedFriend._id }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Friend has been removed', 'success');
          this.closeDeleteDialog();
          browserHistory.push('/friends');
        }
      });
    }
  }

  friendIsNotUser(friend) {
    return friend.userId !== Meteor.userId();
  }

  render() {
    const { friends } = this.props;
    return friends.length > 0
      ? <List>
          {friends.sort(sortByMail).map(friend => (
            <ListItem key={friend._id}>
              <FriendAvatar friend={friend} />
              <ListItemText
                inset
                primary={`${friend.firstname} ${friend.lastname}`}
                secondary={friend.email}
              />
              <ListItemSecondaryAction>
                {this.friendIsNotUser(friend) &&
                  <IconButton onClick={() => handleEdit(friend._id)}>
                    <FontAwesome name="pencil" />
                  </IconButton>}
                &nbsp;
                {this.friendIsNotUser(friend) &&
                  <IconButton className="btn-danger" onClick={() => this.showDeleteDialog(friend)}>
                    <FontAwesome name="trash" />
                  </IconButton>}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Dialog
            open={this.state.showDeleteDialog}
            transition={Slide}
            onRequestClose={() => this.closeDeleteDialog()}
          >
            <DialogTitle>
              {
                `Are you sure you want to delete "${this.state.selectedFriend && this.state.selectedFriend.email}"`
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting a friend may break unpaid expenses
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.closeDeleteDialog()} color="primary">
                <FontAwesome name="undo" />&nbsp;Cancel
              </Button>
              <Button onClick={() => this.handleRemove()} color="primary">
                <FontAwesome name="trash" />&nbsp;Delete
              </Button>
            </DialogActions>
          </Dialog>
        </List>
      : <List><ListItem>You don't have any friends...yet</ListItem></List>;
  }
}

FriendsList.propTypes = {
  friends: React.PropTypes.array,
};
