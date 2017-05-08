import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FriendEditor from '../../components/friends/FriendEditor.js';

const EditFriend = ({ friend }) => (
  <Layout container align="center" justify="center" className="NewFriend">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Editing : {`${friend.firstname} ${friend.lastname}`}
        </Typography>
        <FriendEditor friend={friend} />
      </Paper>
    </Layout>
  </Layout>
);

EditFriend.propTypes = {
  friend: React.PropTypes.object,
};

export default EditFriend;
