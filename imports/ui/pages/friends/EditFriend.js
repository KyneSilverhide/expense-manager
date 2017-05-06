import React from 'react';
import FriendEditor from '../../components/friends/FriendEditor.js';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';

const EditFriend = ({ friend }) => (
  <Layout container align="center" justify="center" className="NewFriend">
    <Layout item xs={5}>
      <Paper className="paper-fixed">
        <Text type="headline" component="h3">
          Editing : {`${friend.firstname} ${friend.lastname}`}
        </Text>
        <FriendEditor friend={friend} />
      </Paper>
    </Layout>
  </Layout>
);

EditFriend.propTypes = {
  friend: React.PropTypes.object,
};

export default EditFriend;
