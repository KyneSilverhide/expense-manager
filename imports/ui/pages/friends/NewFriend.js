import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import FriendEditor from '../../components/friends/FriendEditor.js';

const NewFriend = () => (
  <Grid container align="center" justify="center" className="NewFriend">
    <Grid item xs={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Add a new friend
        </Typography>
        <FriendEditor />
      </Paper>
    </Grid>
  </Grid>
);

export default NewFriend;
