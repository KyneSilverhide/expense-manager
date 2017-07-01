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
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import { removeEvent } from '../../../api/events/event.methods.js';
import { sortByDate } from '../../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/events/${_id}/edit`);
};

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteDialog: false, selectedEvent: null };
  }

  showDeleteDialog(event) {
    this.setState({ showDeleteDialog: true, selectedEvent: event });
  }

  closeDeleteDialog() {
    this.setState({ showDeleteDialog: false });
  }

  handleRemove() {
    if (this.state.selectedEvent) {
      removeEvent.call({ _id: this.state.selectedEvent._id }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Event has been removed', 'success');
          this.closeDeleteDialog();
          browserHistory.push('/events');
        }
      });
    }
  }

  completedFilter(event) {
    const { showCompleted } = this.props;
    return !event.completed || showCompleted;
  }

  render() {
    const { events } = this.props;
    return events.length > 0
      ? <List>
          {events
            .filter(this.completedFilter.bind(this))
            .sort(sortByDate)
            .map(event =>
              <ListItem key={event._id}>
                <Avatar>
                  {event && event.completed
                    ? <FontAwesome
                        name="check"
                        title="This event has been completed"
                      />
                    : <FontAwesome
                        name="calendar"
                        title="This event is ongoing"
                      />}
                </Avatar>
                <ListItemText
                  inset
                  primary={event.name}
                  secondary={moment(event.date).format('DD/MM/YYYY')}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(event._id)}>
                    <FontAwesome name="pencil" />
                  </IconButton>&nbsp;
                  <IconButton
                    className="btn-danger"
                    onClick={() => this.showDeleteDialog(event)}
                  >
                    <FontAwesome name="trash" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          <Dialog
            open={this.state.showDeleteDialog}
            transition={Slide}
            onRequestClose={() => this.closeDeleteDialog()}
          >
            <DialogTitle>
              {`Are you sure you want to delete event "${this.state
                .selectedEvent && this.state.selectedEvent.name}"`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting an event will remove all expenses (paid or unpaid)
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
      : <Grid container>
          <Grid item>
            <Typography type="subheading">You don't have any events</Typography>
          </Grid>
        </Grid>;
  }
}

EventsList.propTypes = {
  events: React.PropTypes.array,
  showCompleted: React.PropTypes.bool,
};
