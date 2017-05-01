import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import FontAwesome from 'react-fontawesome';

const NotFound = () => (
  <Layout container align="center" justify="center">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Text type="headline" component="h3">
          <FontAwesome name="exclamation-circle" /> Error [404]
        </Text>
        <Text type="body1" component="p">
          {window.location.pathname} doesn't exist.
        </Text>
      </Paper>
    </Layout>
  </Layout>
);

export default NotFound;
