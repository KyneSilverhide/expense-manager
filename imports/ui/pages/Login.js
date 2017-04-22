import React from 'react';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import FontAwesome from 'react-fontawesome';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';

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
          Bert.alert('Connected', 'success', 'growl-top-right', 'fa-check');
          if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else {
            browserHistory.push('/');
          }
        }
      },
    );
  }

  render() {
    return (
      <Layout className="login-container" container align="center" justify="center">
        <Layout item xs={12} sm={4}>
          <Paper>
            <Layout container justify="center" direction="column" align="stretch">
              <h1 className="login-title">Login</h1>
            </Layout>
            <Layout container align="center" direction="column" justify="center">
              <FontAwesome name="user-circle-o" className="login-avatar" />
              <Button className="google-login" raised primary onClick={() => this.handleLogin()}>
                <FontAwesome name="google-plus" />&nbsp;Login with Google
              </Button>
            </Layout>
          </Paper>
        </Layout>
      </Layout>
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.object,
};
