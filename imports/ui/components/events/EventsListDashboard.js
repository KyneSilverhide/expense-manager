/* eslint-disable no-confusing-arrow */

import React from 'react';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import EventExpenses from './EventExpenses.js';
import { removeEvent } from '../../../api/events/event.methods.js';
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
    const { events } = this.props;
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
                  title={event.name}
                  subheader={moment(event.date).format('DD/MM/YYYY')}
                />
                <CardContent className="event-card-content">
                  <EventExpenses expenses={event.expenses} readOnly={true} />
                </CardContent>
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
};
