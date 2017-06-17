/* eslint-disable max-len, no-return-assign */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { Bert } from 'meteor/themeteorchef:bert';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import FriendAvatar from '../friends/FriendAvatar.js';
import { userIsFriend, isFriendMailInExpense } from '../debts/debt-utils';
import { upsertEvent } from '../../../api/events/event.methods.js';

export default class EventExpensesDashboard extends React.Component {
  sendPaymentStatus(event, currentExpense, currentFriend, paymentStatus) {
    const upsert = event;
    delete upsert.owner;
    for (const expense of event.expenses) {
      if (expense === currentExpense) {
        for (const friend of expense.friends) {
          if (friend === currentFriend) {
            friend.paidExpense = paymentStatus;
          }
        }
      }
    }
    upsertEvent.call(upsert, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(paymentStatus ? 'Expense has been paid' : 'Payment canceled', 'success');
      }
    });
  }

  payExpense(event, currentExpense, currentFriend) {
    this.sendPaymentStatus(event, currentExpense, currentFriend, true);
  }

  cancelPayment(event, currentExpense, currentFriend) {
    this.sendPaymentStatus(event, currentExpense, currentFriend, false);
  }

  renderExpenseHeader(expense) {
    return (
      <Grid container direction="row">
        <Grid item>
          <Typography type="subheading">
            {expense.name} : {expense.amount} <FontAwesome name="eur" />
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderDebtFromFriend(event, expense, friend) {
    if (userIsFriend(friend)) {
      return '';
    }
    const ratio = expense.friends.length;
    const debtFromFriend = (expense.amount / ratio).toFixed(2);
    return (
      <Typography className={`debt-from-friend ${friend.paidExpense ? 'paid' : ''}`} type="body1">
        + {debtFromFriend} <FontAwesome name="eur" />
      </Typography>
    );
  }

  friendIsOwner(event, friend) {
    return event.ownerId === friend.userId;
  }

  renderDebtTowardFriend(event, expense, friend) {
    if (!this.friendIsOwner(event, friend)) {
      return '';
    }
    const ratio = expense.friends.length;
    const debtTowardFriend = (expense.amount / ratio).toFixed(2);
    return (
      <Typography className={`debt-toward-friend ${friend.paidExpense ? 'paid' : ''}`} type="body1">
        - {debtTowardFriend} <FontAwesome name="eur" />
      </Typography>
    );
  }

  renderDebt(event, expense, friend) {
    if (event.ownerId === Meteor.userId()) {
      return this.renderDebtFromFriend(event, expense, friend);
    }
    return this.renderDebtTowardFriend(event, expense, friend);
  }

  renderPayDebtButton(event, expense, friend) {
    if (friend.paidExpense) {
      return (
        <IconButton
          aria-label="Paid"
          title="Paid. Click to cancel"
          className="hover-btn"
          onClick={() => this.cancelPayment(event, expense, friend)}
        >
          <FontAwesome name="check" className="btn-success" />
        </IconButton>
      );
    }
    const friendOwesMe = event.ownerId === Meteor.userId() && !userIsFriend(friend);
    const iOweFriend = event.ownerId !== Meteor.userId() && this.friendIsOwner(event, friend);
    if (friendOwesMe || iOweFriend) {
      return (
        <IconButton
          aria-label="Pay"
          title="Not paid yet. Click to change status"
          className="hover-btn"
          onClick={() => this.payExpense(event, expense, friend)}
        >
          <FontAwesome name="credit-card" className="btn-success" />
        </IconButton>
      );
    }
    return '';
  }

  renderFriends(expense) {
    const { event } = this.props;
    return (
      <Grid container direction="row" className="event-dashboard-friends">
        <List dense>
          {expense.friends.map(friend => (
            <ListItem button key={friend._id} divider={true}>
              <FriendAvatar friend={friend} />
              <ListItemText
                className="debts friend"
                inset
                primary={`${friend.firstname} ${friend.lastname}`}
              />
              <ListItemText
                className="debts amount"
                primary={this.renderDebt(event, expense, friend)}
              />
              <ListItemSecondaryAction>
                {this.renderPayDebtButton(event, expense, friend)}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  }

  renderExpense(expense) {
    const { userAsFriend } = this.props;
    const userInExpense = isFriendMailInExpense(expense, userAsFriend);
    if (userInExpense) {
      return (
        <Paper key={`${expense.name} ${expense.amount}`} className="expense paper-fixed">
          <ListItem button>
            <ListItemText
              primary={this.renderExpenseHeader(expense)}
              secondary={this.renderFriends(expense)}
            />
          </ListItem>
        </Paper>
      );
    }
    return '';
  }

  render() {
    const { event } = this.props;
    return (
      <Grid container direction="column">
        <Grid item>
          <List className="no-hover">
            {event.expenses.map(expense => this.renderExpense(expense))}
          </List>
        </Grid>
      </Grid>
    );
  }
}

EventExpensesDashboard.propTypes = {
  event: React.PropTypes.object,
  userAsFriend: React.PropTypes.object,
};
