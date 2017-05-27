/* eslint-disable max-len, no-return-assign */

import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import FontAwesome from 'react-fontawesome';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Layout from 'material-ui/Layout';
import Chip from 'material-ui/Chip';
import Slide from 'material-ui/transitions/Slide';
import { Bert } from 'meteor/themeteorchef:bert';
import FriendAvatar from '../friends/FriendAvatar.js';
import FriendSelection from '../../containers/friends/FriendSelection.js';

export default class CreateExpenseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedFriends: [],
      nameError: false,
      amountError: false,
      friendsError: false,
    };
  }

  componentDidMount() {
    const { show, userAsFriend } = this.props;
    this.setState({
      show,
      selectedFriends: userAsFriend ? [userAsFriend] : [],
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      show: props.show,
    });
  }

  closeCreateExpenseDialog() {
    this.setState({
      show: false,
    });
  }

  removeSelectedFriend(friend) {
    const friends = this.state.selectedFriends;
    friends.splice(friends.indexOf(friend), 1);
    this.setState({ friends });
  }

  addSelectedFriend(friend) {
    const friends = this.state.selectedFriends;
    friends.push(friend);
    this.setState({ friends });
  }

  validateName(name) {
    if (name.trim() === '') {
      this.setState({
        nameError: true,
      });
      return false;
    }
    this.setState({
      nameError: false,
    });
    return true;
  }

  validateAmount(amount) {
    if (Number.isNaN(amount) || Number(amount) <= 0) {
      this.setState({
        amountError: true,
      });
      return false;
    }
    this.setState({
      amountError: false,
    });
    return true;
  }

  validateFriends(friends) {
    if (friends.length < 1) {
      this.setState({
        friendsError: true,
      });
      return false;
    }
    this.setState({
      friendsError: false,
    });
    return true;
  }

  validateAndSaveExpense() {
    const { onSave } = this.props;
    const name = $('#expense-name').val();
    const amount = $('#expense-amount').val();
    const friends = this.state.selectedFriends;

    let valid = true;
    valid = this.validateName(name) && valid;
    valid = this.validateAmount(amount) && valid;
    valid = this.validateFriends(friends) && valid;
    if (valid) {
      const newExpense = {
        name,
        amount: Number(amount),
        friends,
      };
      this.setState({
        show: false,
      });
      onSave(newExpense);
    } else {
      Bert.alert(
        'Please check the required fields and ensure at least one friend has been selected',
        'info',
      );
    }
  }

  render() {
    return (
      <Dialog
        open={this.state.show}
        transition={Slide}
        onRequestClose={() => this.closeCreateExpenseDialog()}
      >
        <DialogTitle>
          Please fill in the new expense
        </DialogTitle>
        <DialogContent>
          <FormControl className="form-header">
            <InputLabel error={this.state.nameError} required htmlFor="expense-name">
              Name
            </InputLabel>
            <Input id="expense-name" name="name" />
          </FormControl>
          <FormControl className="form-header">
            <InputLabel error={this.state.amountError} required htmlFor="expense-amount">
              Amount (<FontAwesome name="eur" />)
            </InputLabel>
            <Input id="expense-amount" type="number" />
          </FormControl>
          <Layout container direction="row">
            {this.state.selectedFriends.map(friend => (
              <Layout key={friend._id} item>
                <Chip
                  className="friend-chip"
                  avatar={<FriendAvatar friend={friend} />}
                  label={`${friend.firstname} ${friend.lastname}`}
                  onRequestDelete={() => this.removeSelectedFriend(friend)}
                  onClick={() => this.removeSelectedFriend(friend)}
                />
              </Layout>
            ))}
          </Layout>
          <div className="form-divider" />
          {this.state.friendsError
            ? <Typography className="error" type="body">
                You need to add at least one friend
              </Typography>
            : ''}
          <FriendSelection
            onAdd={this.addSelectedFriend.bind(this)}
            selectedFriends={this.state.selectedFriends}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.closeCreateExpenseDialog()}>
            <FontAwesome name="undo" />&nbsp;Cancel
          </Button>
          <Button onClick={() => this.validateAndSaveExpense()} primary raised>
            <FontAwesome name="plus" />&nbsp;Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateExpenseDialog.propTypes = {
  show: React.PropTypes.bool,
  onSave: React.PropTypes.func,
  userAsFriend: React.PropTypes.object,
};
