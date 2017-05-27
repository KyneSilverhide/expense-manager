/* eslint-disable no-confusing-arrow */

import React from 'react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Card, CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Layout from 'material-ui/Layout';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import EventExpenses from './EventExpenses.js';
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

  render() {
    const { events, readOnly } = this.props;
    return events.length > 0
      ? <Layout container direction="row">
          {events.sort(sortByDate).map(event => (
            <Layout item key={event._id} xs={4}>
              <Card className="event-card">
                <CardHeader
                  className="event-card-header"
                  avatar={
                    <Avatar>
                      {event && event.completed
                        ? <FontAwesome name="check" title="This event has been completed" />
                        : <FontAwesome name="calendar" title="This event is ongoing" />}
                    </Avatar>
                  }
                  title={event.name}
                  subheader={moment(event.date).format('DD/MM/YYYY')}
                />
                <CardContent className="event-card-content">
                  <EventExpenses expenses={event.expenses} readOnly={true} />
                </CardContent>
                {!readOnly &&
                  <CardActions disableActionSpacing>
                    <Layout container justify="flex-end">
                      <Layout item>
                        <IconButton onClick={() => handleEdit(event._id)}>
                          <FontAwesome name="pencil" />
                        </IconButton>&nbsp;
                        <IconButton
                          className="btn-danger"
                          onClick={() => this.showDeleteDialog(event)}
                        >
                          <FontAwesome name="trash" />
                        </IconButton>
                      </Layout>
                    </Layout>
                  </CardActions>}
              </Card>
            </Layout>
          ))}
          <Dialog
            open={this.state.showDeleteDialog}
            transition={Slide}
            onRequestClose={() => this.closeDeleteDialog()}
          >
            <DialogTitle>
              {
                `Are you sure you want to delete event "${this.state.selectedEvent && this.state.selectedEvent.name}"`
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting an event will remove all expenses (paid or unpaid)
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.closeDeleteDialog()} primary>
                <FontAwesome name="undo" />&nbsp;Cancel
              </Button>
              <Button onClick={() => this.handleRemove()} primary>
                <FontAwesome name="trash" />&nbsp;Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Layout>
      : <Layout container>
          <Layout item><Typography type="subheading">You don't have any events</Typography></Layout>
        </Layout>;
  }
}

EventsList.propTypes = {
  events: React.PropTypes.array,
  readOnly: React.PropTypes.bool,
};
