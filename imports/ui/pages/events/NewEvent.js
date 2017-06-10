import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import EventEditor from '../../components/events/EventEditor.js';

const NewEvent = () => (
  <Grid container align="center" justify="center" className="NewEvent">
    <Grid item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Add a new event
        </Typography>
        <EventEditor />
      </Paper>
    </Grid>
  </Grid>
);

export default NewEvent;
