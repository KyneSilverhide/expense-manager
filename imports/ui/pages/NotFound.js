import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FontAwesome from 'react-fontawesome';

const NotFound = () => (
  <Grid container align="center" justify="center">
    <Grid item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          <FontAwesome name="exclamation-circle" /> Error [404]
        </Typography>
        <Typography type="body1" component="p">
          {window.location.pathname} doesn't exist.
        </Typography>
      </Paper>
    </Grid>
  </Grid>
);

export default NotFound;
