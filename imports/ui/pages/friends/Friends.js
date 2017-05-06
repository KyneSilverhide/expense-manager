import React from 'react';
import { Link } from 'react-router';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FriendsList from '../../containers/friends/FriendsList.js';

const Friends = () => (
  <Layout container align="center" justify="center" className="Friends">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Text type="headline" component="h3">
          Friends
        </Text>
        <FriendsList />
      </Paper>
    </Layout>
    <Link to="/friends/new">
      <Button fab primary>
        <AddIcon />
      </Button>
    </Link>
  </Layout>
);

export default Friends;
