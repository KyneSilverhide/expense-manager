import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import FontAwesome from 'react-fontawesome';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';
import {
  linkConnectedUserToFriendsWithSameEmail,
  createUserAsFriend,
} from '../../api/friends/friend.methods.js';

const linkUserToFriends = () => {
  const user = Meteor.user();
  const googleData = {
    email: user.services.google.email,
    googleAvatar: user.services.google.picture,
    firstname: user.services.google.given_name,
    lastname: user.services.google.family_name,
  };

  createUserAsFriend.call(googleData, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    }
  });

  linkConnectedUserToFriendsWithSameEmail.call(googleData, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    }
  });
};

const successFullLogin = () => {
  Bert.alert('Connected', 'success', 'growl-top-right', 'fa-check');
  if (location.state && location.state.nextPathname) {
    browserHistory.push(location.state.nextPathname);
  } else {
    browserHistory.push('/');
  }
  linkUserToFriends();
};

export default class Login extends React.Component {
  handleLogin() {
    Meteor.loginWithGoogle(
      {
        requestPermissions: ['profile', 'email'],
      },
      (error) => {
        if (error) {
          Bert.alert(error.message, 'danger', 'growl-top-right', 'fa-frown-o');
        } else {
          successFullLogin();
        }
      },
    );
  }

  render() {
    return (
      <Grid className="login-container" container align="center" justify="center">
        <Grid item xs={12} sm={4}>
          <Paper>
            <Grid container justify="center" direction="column" align="stretch">
              <h1 className="login-title">Login</h1>
            </Grid>
            <Grid container align="center" direction="column" justify="center">
              <FontAwesome name="user-circle-o" className="login-avatar" />
              <Button className="google-login" raised primary onClick={() => this.handleLogin()}>
                <FontAwesome name="google-plus" />&nbsp;Login with Google
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.object,
};
