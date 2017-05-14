/* eslint-disable max-len, no-return-assign */

import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import InputLabel from 'material-ui/Input/InputLabel';
import 'react-infinite-calendar/styles.css';

export default class EventCalendar extends React.Component {
  render() {
    const { event, onSelectedDate } = this.props;
    return (
      <div>
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
          onSelect={date => onSelectedDate(date)}
          selected={event && event.date}
          width={500}
          height={300}
        />
      </div>
    );
  }
}

EventCalendar.propTypes = {
  event: React.PropTypes.object,
  onSelectedDate: React.PropTypes.func,
};
