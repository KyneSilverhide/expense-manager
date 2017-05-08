import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FontAwesome from 'react-fontawesome';

const NotFound = () => (
  <Layout container align="center" justify="center">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          <FontAwesome name="exclamation-circle" /> Error [404]
        </Typography>
        <Typography type="body1" component="p">
          {window.location.pathname} doesn't exist.
        </Typography>
      </Paper>
    </Layout>
  </Layout>
);

export default NotFound;
