import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FriendEditor from '../../components/friends/FriendEditor.js';

const NewFriend = () => (
  <Layout container align="center" justify="center" className="NewFriend">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Add a new friend
        </Typography>
        <FriendEditor />
      </Paper>
    </Layout>
  </Layout>
);

export default NewFriend;
