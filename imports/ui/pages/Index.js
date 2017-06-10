import React from 'react';
import Grid from 'material-ui/Grid';
import EventsListDashboard from '../containers/events/EventsListDashboard';
import Debts from '../containers/debts/Debts';

const Index = () => (
  <Grid container direction="row">
    <Grid item xs={12} sm={9}>
      <EventsListDashboard />
    </Grid>
    <Grid item xs={12} sm={3}>
      <Debts />
    </Grid>
  </Grid>
);

export default Index;
