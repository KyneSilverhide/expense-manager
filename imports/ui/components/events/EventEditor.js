/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Input from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import { LabelSwitch } from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import eventEditor from './event-editor.js';
import EventCalendar from './EventCalendar.js';
import EventExpenses from './EventExpenses.js';

const backToList = () => {
  browserHistory.push('/events');
};

export default class EventEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false, date: '', expenses: [] };
  }

  componentDidMount() {
    const { event } = this.props;
    eventEditor({ component: this });
    this.setState({
      completed: event ? event.completed : false,
      date: event ? event.date : new Date(),
      expenses: event ? event.expenses : [],
    });
    setTimeout(() => {
      $('[name="name"]').focus();
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({
        completed: nextProps.event.completed,
        date: nextProps.event.date,
        expenses: nextProps.event.expenses,
      });
    }
  }

  toggleCompletionState(checked) {
    this.setState({ completed: checked });
  }

  updateSelectedDate(date) {
    this.setState({ date });
  }

  removeExpense(expense) {
    const expenses = this.state.expenses;
    expenses.splice(expenses.indexOf(expense), 1);
    this.setState({ expenses });
  }

  addNewExpense(expense) {
    const expenses = this.state.expenses;
    expenses.push(expense);
    this.setState({ expenses });
  }

  render() {
    const { event } = this.props;
    return (
      <form
        key={event && event._id}
        ref={form => (this.eventEditorForm = form)}
        onSubmit={submitEvent => submitEvent.preventDefault()}
      >
        <Grid container direction="column">
          <Grid item>
            <Paper className="paper-fixed">
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row">
                    <Grid item xs={8}>
                      <FormControl className="form-header">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Please type the event name"
                          defaultValue={event && event.name}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <EventCalendar
                        event={event}
                        onSelectedDate={this.updateSelectedDate.bind(this)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <LabelSwitch
                          checked={this.state.completed}
                          label="Completed"
                          onChange={(changeEvent, checked) =>
                            this.toggleCompletionState(checked)}
                        />
                        <Typography type="caption">
                          Completed events are hidden and won't be used to
                          compute
                          debts
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <EventExpenses
              expenses={this.state.expenses}
              onAdd={this.addNewExpense.bind(this)}
              onRemove={this.removeExpense.bind(this)}
            />
          </Grid>
          <Grid item>
            <Paper className="paper-fixed">
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={() => backToList()}>
                    <FontAwesome name="undo" />&nbsp;Cancel
                  </Button>
                  &nbsp;
                  <Button raised color="primary" type="submit">
                    <FontAwesome name="floppy-o" />&nbsp;{event && event._id ? 'Save' : 'Create'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  }
}

EventEditor.propTypes = {
  event: React.PropTypes.object,
};
