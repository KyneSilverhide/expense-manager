/* eslint-disable no-confusing-arrow */

import React from 'react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import EventExpensesDashboard from './EventExpensesDashboard.js';
import FriendAvatar from '../friends/FriendAvatar';
import { removeEvent, markCompleted } from '../../../api/events/event.methods.js';
import { sortByDate } from '../../../modules/sorting.js';

export default class EventsListDashboard extends React.Component {
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

  userIsOwner(event) {
    return event.ownerId === Meteor.userId();
  }

  sendMailToFriends(event) {
    Meteor.call('events.email.friends', event, (error) => {
      if (error) {
        Bert.alert(error, 'danger');
      } else {
        Bert.alert('A mail has been sent to your friends', 'success');
      }
    });
  }

  markCompleted(event) {
    markCompleted.call({ _id: event._id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Event is now completed', 'success');
      }
    });
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
    const { events, userAsFriend } = this.props;
    return events.length > 0
      ? <Grid container direction="row" className="events-dashboard">
          {events.sort(sortByDate).map(event => (
            <Grid item key={event._id} xs={4}>
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
                  title={
                    <span>
                      <span className="event-paid-by">
                        Paid by <FriendAvatar friend={event.owner} />
                      </span>
                      <Typography className="flex">{event.name}</Typography>
                    </span>
                  }
                  subheader={moment(event.date).format('DD/MM/YYYY')}
                />
                <CardContent className="event-card-content">
                  <EventExpensesDashboard event={event} userAsFriend={userAsFriend} />
                </CardContent>
                {this.userIsOwner(event) &&
                  <CardActions disableActionSpacing>
                    <IconButton
                      title="Send mail"
                      aria-label="Send mail"
                      onClick={() => this.sendMailToFriends(event)}
                    >
                      <FontAwesome title="Send mail" name="envelope" />
                    </IconButton>
                    <IconButton
                      title="Mark completed"
                      aria-label="Mark completed"
                      onClick={() => this.markCompleted(event)}
                    >
                      <FontAwesome title="Mark completed" name="check" />
                    </IconButton>
                  </CardActions>}
              </Card>
            </Grid>
          ))}
        </Grid>
      : <Grid container>
          <Grid item><Typography type="subheading">You don't have any events</Typography></Grid>
        </Grid>;
  }
}

EventsListDashboard.propTypes = {
  events: React.PropTypes.array,
  userAsFriend: React.PropTypes.object,
};
