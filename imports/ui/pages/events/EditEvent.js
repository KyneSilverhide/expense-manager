import React from 'react';
import Grid from 'material-ui/Grid';
import EventEditor from '../../components/events/EventEditor.js';

const EditEvent = ({ event }) => (
  <Grid container align="center" justify="center" className="NewEvent">
    <Grid item xs={6}>
      <EventEditor event={event} />
    </Grid>
  </Grid>
);

EditEvent.propTypes = {
  event: React.PropTypes.object,
};

export default EditEvent;
