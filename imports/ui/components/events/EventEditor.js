/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Input from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import { LabelSwitch } from 'material-ui/Switch';
import Layout from 'material-ui/Layout';
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
    setTimeout(
      () => {
        $('[name="name"]').focus();
      },
      0,
    );
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
        ref={form => this.eventEditorForm = form}
        onSubmit={submitEvent => submitEvent.preventDefault()}
      >
        <Layout container direction="column">
          <Layout item>
            <Paper className="paper-fixed">
              <Layout container align="center" justify="space-around">
                <Layout item>
                  <FormControl className="form-header">
                    <Input id="name" name="name" defaultValue={event && event.name} />
                  </FormControl>
                </Layout>
                <Layout item>
                  <EventCalendar
                    event={event}
                    onSelectedDate={this.updateSelectedDate.bind(this)}
                  />
                </Layout>
                <Layout item>
                  <FormControl>
                    <LabelSwitch
                      checked={this.state.completed}
                      label="Completed"
                      onChange={(changeEvent, checked) => this.toggleCompletionState(checked)}
                    />
                  </FormControl>
                </Layout>
              </Layout>
            </Paper>
          </Layout>
          <Layout item>
            <EventExpenses
              expenses={this.state.expenses}
              onAdd={this.addNewExpense.bind(this)}
              onRemove={this.removeExpense.bind(this)}
            />
          </Layout>
          <Layout item>
            <Paper className="paper-fixed">
              <Layout container justify="flex-end">
                <Layout item>
                  <Button onClick={() => backToList()}>
                    <FontAwesome name="undo" />&nbsp;Cancel
                  </Button>
                  &nbsp;
                  <Button raised primary type="submit">
                    <FontAwesome name="floppy-o" />&nbsp;{event && event._id ? 'Save' : 'Add'}
                  </Button>
                </Layout>
              </Layout>
            </Paper>
          </Layout>
        </Layout>
      </form>
    );
  }
}

EventEditor.propTypes = {
  event: React.PropTypes.object,
};
