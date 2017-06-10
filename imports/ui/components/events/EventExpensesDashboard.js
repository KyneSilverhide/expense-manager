/* eslint-disable max-len, no-return-assign */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import FriendAvatar from '../friends/FriendAvatar.js';
import { userIsFriend, isFriendMailInExpense } from '../debts/debt-utils';

export default class EventExpensesDashboard extends React.Component {
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
      <Typography className="debt-from-friend" type="body1">
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
      <Typography className="debt-toward-friend" type="body1">
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

  renderFriends(expense) {
    const { event } = this.props;
    return (
      <Grid container direction="row" className="event-dashboard-friends">
        <List dense>
          {expense.friends.map(friend => (
            <ListItem button key={friend._id}>
              <FriendAvatar friend={friend} />
              <ListItemText inset primary={`${friend.firstname} ${friend.lastname}`} />
              <ListItemText className="debts" primary={this.renderDebt(event, expense, friend)} />
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
          <List>
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
