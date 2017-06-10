import React from 'react';
import { Link } from 'react-router';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FriendsList from '../../containers/friends/FriendsList.js';

const Friends = () => (
  <Grid container align="center" justify="center" className="Friends">
    <Grid item xs={12} sm={12} md={8} lg={5}>
      <Paper className="paper-fixed">
        <Typography type="headline" component="h3">
          Friends
        </Typography>
        <FriendsList />
      </Paper>
    </Grid>
    <Link to="/friends/new">
      <Button fab primary>
        <AddIcon />
      </Button>
    </Link>
  </Grid>
);

export default Friends;
