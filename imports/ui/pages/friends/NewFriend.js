import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import FriendEditor from '../../components/friends/FriendEditor.js';

const NewFriend = () => (
  <Layout container align="center" justify="center" className="NewFriend">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Text type="headline" component="h3">
          Add a new friend
        </Text>
        <FriendEditor />
      </Paper>
    </Layout>
  </Layout>
);

export default NewFriend;
