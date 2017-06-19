import React from 'react';
import Grid from 'material-ui/Grid';
import EventEditor from '../../components/events/EventEditor.js';

const NewEvent = () => (
  <Grid container align="center" justify="center" className="NewEvent">
    <Grid item xs={12} sm={8} md={5}>
      <EventEditor />
    </Grid>
  </Grid>
);

export default NewEvent;
