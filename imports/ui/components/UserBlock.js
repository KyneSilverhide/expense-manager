import React from 'react';
import { browserHistory } from 'react-router';
import Button from 'material-ui/Button';
import ToolbarGroup from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FontAwesome from 'react-fontawesome';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const mail = user && user.profile && user.profile.name ? user.profile.name : '';
  return mail;
};

const userPicture = () => {
  const user = Meteor.user();
  return user && user.services && user.services.google && user.services.google.picture
    ? user.services.google.picture
    : '';
};

const userMail = () => {
  const user = Meteor.user();
  return user && user.services && user.services.google && user.services.google.email
    ? user.services.google.email
    : '';
};

const UserBlock = () => (
  <ToolbarGroup>
    <Grid container direction="row" align="center">
      <Grid item>
        <Avatar className="user-avatar" alt={userName()} src={userPicture()} />
      </Grid>
      <Grid item>
        <Grid container direction="column" align="center">
          <Typography component="span" color="inherit">{userName()}</Typography>
          <Typography component="small" type="caption" color="inherit">{userMail()}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button color="contrast" onClick={() => handleLogout()}>
          <FontAwesome name="sign-out" />&nbsp;Logout
        </Button>
      </Grid>
    </Grid>
  </ToolbarGroup>
);

export default UserBlock;
