import React from 'react';
import Grid from 'material-ui/Grid';
import EventEditor from '../../components/events/EventEditor.js';

const EditEvent = ({ event }) => (
  <Grid container align="center" justify="center" className="NewFriend">
    <Grid item xs={12} sm={8} md={5}>
      <EventEditor event={event} />
    </Grid>
  </Grid>
);

EditEvent.propTypes = {
  event: React.PropTypes.object,
};

export default EditEvent;
