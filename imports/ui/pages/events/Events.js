import React from 'react';
import { Link } from 'react-router';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EventsList from '../../containers/events/EventsList.js';

const Events = () => (
  <Grid container align="center" justify="center" className="EventsList">
    <Grid item xs={12} sm={12} md={8} lg={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Events
        </Typography>
        <EventsList />
      </Paper>
    </Grid>
    <Grid item xs={1}>
      <Link to="/events/new">
        <Button fab color="primary">
          <AddIcon />
        </Button>
      </Link>
    </Grid>
  </Grid>
);

export default Events;
