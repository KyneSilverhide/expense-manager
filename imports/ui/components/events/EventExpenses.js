/* eslint-disable max-len, no-return-assign */

import React from 'react';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import FontAwesome from 'react-fontawesome';
import Slide from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import FriendAvatar from '../friends/FriendAvatar.js';
import CreateExpenseDialog from '../../containers/events/CreateExpenseDialog.js';
import eventEditor from './event-editor.js';

export default class EventExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateExpenseDialog: false,
      showDeleteExpenseDialog: false,
      currentExpense: {},
    };
  }

  componentDidMount() {
    eventEditor({ component: this });
  }

  showDeleteExpenseDialog(expense) {
    this.setState({
      showDeleteExpenseDialog: true,
      currentExpense: expense,
    });
  }

  showCreateExpenseDialog() {
    this.setState({
      showCreateExpenseDialog: true,
    });
  }

  closeDeleteExpenseDialog() {
    this.setState({
      showDeleteExpenseDialog: false,
    });
  }

  removeCurrentExpense() {
    const { onRemove } = this.props;
    if (this.state.currentExpense) {
      onRemove(this.state.currentExpense);
      this.setState({ showDeleteExpenseDialog: false });
    }
  }

  addNewExpense(expense) {
    const { onAdd } = this.props;
    this.setState({ showCreateExpenseDialog: false });
    onAdd(expense);
  }

  renderExpenseHeader(expense) {
    return (
      <Grid container direction="row">
        <Grid item>
          <Typography type="body1">
            {expense.name} : {expense.amount} <FontAwesome name="eur" />
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderFriends(expense) {
    return (
      <Grid container direction="row" className="event-friends">
        {expense.friends.map(friend => (
          <Grid item key={friend._id} className="event-friend">
            <FriendAvatar title={`${friend.firstname} ${friend.lastname}`} friend={friend} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { expenses, readOnly } = this.props;
    return (
      <Grid container direction="column">
        {!readOnly &&
          <span className="new-expense-fab">
            <Button fab primary onClick={() => this.showCreateExpenseDialog()}>
              <FontAwesome name="eur" size="2x" />
            </Button>
            <Typography type="caption">Click here to add expenses</Typography>
          </span>}
        <Grid item>
          {expenses.length === 0 &&
            <Paper className="paper-fixed">
              <Typography type="subheading">
                Please add at least one expense in this event
              </Typography>
            </Paper>}
          <List>
            {expenses.map(expense => (
              <Paper key={`${expense.name} ${expense.amount}`} className="expense paper-fixed">
                <ListItem button>
                  <ListItemText
                    primary={this.renderExpenseHeader(expense)}
                    secondary={this.renderFriends(expense)}
                  />
                  {!readOnly &&
                    <ListItemSecondaryAction>
                      <IconButton
                        className="btn-danger"
                        onClick={() => this.showDeleteExpenseDialog(expense)}
                      >
                        <FontAwesome name="trash" />
                      </IconButton>
                    </ListItemSecondaryAction>}
                </ListItem>
              </Paper>
            ))}
          </List>
        </Grid>
        <Dialog
          open={this.state.showDeleteExpenseDialog}
          transition={Slide}
          onRequestClose={() => this.closeDeleteDialog()}
        >
          <DialogTitle>
            Are you sure you want to delete this expense (<em>
              {this.state.currentExpense && this.state.currentExpense.name}
            </em>) ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.closeDeleteExpenseDialog()}>
              <FontAwesome name="undo" />&nbsp;Cancel
            </Button>
            <Button onClick={() => this.removeCurrentExpense()} primary>
              <FontAwesome name="trash" />&nbsp;Delete
            </Button>
          </DialogActions>
        </Dialog>
        <CreateExpenseDialog
          show={this.state.showCreateExpenseDialog}
          onSave={this.addNewExpense.bind(this)}
        />
      </Grid>
    );
  }
}

EventExpenses.propTypes = {
  expenses: React.PropTypes.array,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
};
