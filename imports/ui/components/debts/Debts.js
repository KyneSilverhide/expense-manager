/* eslint-disable no-confusing-arrow */

import React from 'react';
import FontAwesome from 'react-fontawesome';
import { List, ListItem, ListItemText } from 'material-ui/List';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { sortByMail } from '../../../modules/sorting.js';
import FriendAvatar from '../friends/FriendAvatar';

export default class Debts extends React.Component {
  userIsFriend(friend) {
    return friend.userId && Meteor.userId() === friend.userId;
  }

  isInExpense(expense, targetFriend) {
    let found = false;
    for (const friend of expense.friends) {
      if (friend.email === targetFriend.email) {
        found = true;
      }
    }
    return found;
  }

  getExpenseFromFriend(friend) {
    const { events, userAsFriend } = this.props;
    let totalOwed = 0;
    if (!this.userIsFriend(friend)) {
      for (const event of events) {
        for (const expense of event.expenses) {
          const friendInExpense = this.isInExpense(expense, friend);
          const userInExpense = this.isInExpense(expense, userAsFriend);
          if (friendInExpense && userInExpense) {
            const ratio = expense.friends.length;
            totalOwed += expense.amount / ratio;
          }
        }
      }
    }
    return totalOwed.toFixed(2);
  }

  getExpenseTowardFriend(friend) {
    return friend ? 0 : 0;
  }

  hasDebts(friend) {
    return this.getExpenseFromFriend(friend) > 0 || this.getExpenseTowardFriend(friend) > 0;
  }

  render() {
    const { friends } = this.props;
    return (
      <Layout container>
        <Layout item>
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
        </Layout>
      </Layout>
    );
  }
}

Debts.propTypes = {
  friends: React.PropTypes.array,
  events: React.PropTypes.array,
  userAsFriend: React.PropTypes.object,
};
