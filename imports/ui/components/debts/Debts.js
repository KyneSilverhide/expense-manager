/* eslint-disable no-confusing-arrow */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { sortByMail } from '../../../modules/sorting.js';
import FriendAvatar from '../friends/FriendAvatar';
import { isFriendMailInExpense, isExpensePaidByFriend, userIsFriend } from './debt-utils';

export default class Debts extends React.Component {
  eventWasCreatedByCurrentUser(event) {
    return event.ownerId === Meteor.userId();
  }

  sumExpensesInEventForFriend(event, friend) {
    const { userAsFriend } = this.props;
    let totalOwed = 0;
    for (const expense of event.expenses) {
      const friendInExpense = isFriendMailInExpense(expense, friend);
      const expensePaid = isExpensePaidByFriend(expense, friend);
      const userInExpense = isFriendMailInExpense(expense, userAsFriend);
      if (!expensePaid && friendInExpense && userInExpense) {
        const ratio = expense.friends.length;
        totalOwed += expense.amount / ratio;
      }
    }
    return totalOwed;
  }

  getExpenseFromFriend(friend) {
    const expenseFromFriend = this.getRawExpenseFromFriend(friend);
    const expenseTowardFriend = this.getRawExpenseTowardFriend(friend);
    const roundedOwned = Math.max(0, expenseFromFriend - expenseTowardFriend).toFixed(2);
    return roundedOwned;
  }

  getRawExpenseFromFriend(friend) {
    const { events } = this.props;
    let totalOwed = 0;
    if (!userIsFriend(friend)) {
      for (const event of events) {
        if (this.eventWasCreatedByCurrentUser(event)) {
          totalOwed += this.sumExpensesInEventForFriend(event, friend);
        }
      }
    }
    return totalOwed;
  }

  getExpenseTowardFriend(friend) {
    const expenseTowardFriend = this.getRawExpenseTowardFriend(friend);
    const expenseFromFriend = this.getRawExpenseFromFriend(friend);
    const roundedOwned = Math.max(0, expenseTowardFriend - expenseFromFriend).toFixed(2);
    return roundedOwned;
  }

  getRawExpenseTowardFriend(friend) {
    const { events } = this.props;
    let totalOwed = 0;
    if (!userIsFriend(friend)) {
      for (const event of events) {
        if (!this.eventWasCreatedByCurrentUser(event)) {
          totalOwed += this.sumExpensesInEventForFriend(event, friend);
        }
      }
    }
    return totalOwed;
  }

  hasDebts(friend) {
    return this.getExpenseFromFriend(friend) > 0 || this.getExpenseTowardFriend(friend) > 0;
  }

  render() {
    const { friends } = this.props;
    return (
      <Grid container>
        <Grid item>
          <Paper>
            <List className="debts">
              {friends.filter(this.hasDebts.bind(this)).sort(sortByMail).map(friend => (
                <ListItem button key={friend._id}>
                  <FriendAvatar friend={friend} />
                  <ListItemText
                    inset
                    primary={`${friend.firstname} ${friend.lastname}`}
                    secondary={friend.email}
                  />
                  <ListItemText
                    primary={
                      <Typography className="debt-from-friend" type="subheading">
                        + {this.getExpenseFromFriend(friend)} <FontAwesome name="eur" />
                      </Typography>
                    }
                    secondary={
                      <Typography className="debt-toward-friend" type="subheading">
                        - {this.getExpenseTowardFriend(friend)} <FontAwesome name="eur" />
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Debts.propTypes = {
  friends: React.PropTypes.array,
  events: React.PropTypes.array,
  userAsFriend: React.PropTypes.object,
};
