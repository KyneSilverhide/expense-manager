/* eslint-disable max-len, no-return-assign */

import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import Button from 'material-ui/Button';
import 'react-infinite-calendar/styles.css';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false, date: '' };
  }

  componentDidMount() {
    const { event, onSelectedDate } = this.props;
    this.setState({
      date: event ? event.date : new Date(),
    });
    onSelectedDate(event ? event.date : new Date());
  }

  showDialog() {
    this.setState({ showDialog: true });
  }

  closeDialog() {
    this.setState({ showDialog: false });
  }

  selectDate(date) {
    const { onSelectedDate } = this.props;
    this.setState({
      showDialog: false,
      date,
    });
    onSelectedDate(date);
  }

  render() {
    const { event } = this.props;
    return (
      <div key={event && event._id}>
        <Grid container align="center" justify="flex-start">
          <Grid item xs={5}>
            {moment(this.state.date).format('DD/MM/YYYY')}
          </Grid>
          <Grid item>
            <Button onClick={() => this.showDialog()} color="primary">
              <FontAwesome name="calendar" />
            </Button>
          </Grid>
        </Grid>
        <Dialog open={this.state.showDialog} onRequestClose={() => this.closeDialog()}>
          <DialogTitle>Please pick a date</DialogTitle>
          <DialogContent>
            <InfiniteCalendar
              theme={{
                selectionColor: '#795548',
                weekdayColor: '#8D6E63',
                headerColor: '#795548',
                floatingNav: {
                  background: '#A1887F',
                  color: '#FFF',
                  chevron: '#FFA726',
                },
              }}
              locale={{
                weekStartsOn: 1,
              }}
              onSelect={date => this.selectDate(date)}
              selected={this.state.date}
              width={500}
              height={300}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EventCalendar.propTypes = {
  event: React.PropTypes.object,
  onSelectedDate: React.PropTypes.func,
};
