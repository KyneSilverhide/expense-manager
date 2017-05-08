/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { LabelSwitch } from 'material-ui/Switch';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Button from 'material-ui/Button';
import eventEditor from './event-editor.js';

const backToList = () => {
  browserHistory.push('/events');
};

export default class EventEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false, date: '' };
  }

  componentDidMount() {
    eventEditor({ component: this });
    const { event } = this.props;
    this.setState({ completed: event ? event.completed : false, date: event ? event.date : '' });
    setTimeout(
      () => {
        $('[name="name"]').focus();
      },
      0,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState({ completed: nextProps.event.completed, date: nextProps.event.date });
    }
  }

  toggleCompletionState(checked) {
    this.setState({ completed: checked });
  }

  updateSelectedDate(date) {
    this.setState({ date });
  }

  render() {
    const { event } = this.props;
    return (
      <form
        key={event && event._id}
        ref={form => this.eventEditorForm = form}
        onSubmit={submitEvent => submitEvent.preventDefault()}
      >
        <div className="form-divider" />
        <FormControl>
          <InputLabel htmlFor="name">
            Name
          </InputLabel>
          <Input id="name" name="name" defaultValue={event && event.name} />
        </FormControl>
        <div className="form-divider" />
        <FormControl>
          <InputLabel htmlFor="date">
            Date
          </InputLabel>
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
            onSelect={date => this.updateSelectedDate(date)}
            selected={this.state.date}
            width={500}
            height={300}
          />
          <input type="hidden" name="date" value={this.state.date} />
        </FormControl>
        <FormControl>
          <LabelSwitch
            checked={this.state.completed}
            label="Completed"
            onChange={(changeEvent, checked) => this.toggleCompletionState(checked)}
          />
          <input type="hidden" name="completed" value={this.state.completed} />
        </FormControl>
        <Button raised primary onClick={() => backToList()}>
          <FontAwesome name="undo" />&nbsp;Cancel
        </Button>
        &nbsp;
        <Button raised primary type="submit">
          <FontAwesome name="floppy-o" />&nbsp;{event && event._id ? 'Save' : 'Add'}
        </Button>
      </form>
    );
  }
}

EventEditor.propTypes = {
  event: React.PropTypes.object,
};
