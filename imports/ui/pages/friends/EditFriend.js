import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FriendEditor from '../../components/friends/FriendEditor.js';

const EditFriend = ({ friend }) => (
  <Grid container align="center" justify="center" className="NewFriend">
    <Grid item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Editing : {`${friend.firstname} ${friend.lastname}`}
        </Typography>
        <FriendEditor friend={friend} />
      </Paper>
    </Grid>
  </Grid>
);

EditFriend.propTypes = {
  friend: React.PropTypes.object,
};

export default EditFriend;
