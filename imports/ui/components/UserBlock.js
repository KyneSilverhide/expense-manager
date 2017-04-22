import React from 'react';
import { browserHistory } from 'react-router';
import Button from 'material-ui/Button';
import ToolbarGroup from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Layout from 'material-ui/Layout';
import Text from 'material-ui/Text';
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
    <Layout container direction="row" align="center">
      <Layout item>
        <Avatar className="user-avatar" alt={userName()} src={userPicture()} />
      </Layout>
      <Layout item>
        <Layout container direction="column" align="center">
          <Text component="span" colorInherit={true}>{userName()}</Text>
          <Text component="small" type="caption" colorInherit={true}>{userMail()}</Text>
        </Layout>
      </Layout>
      <Layout item>
        <Button contrast onClick={() => handleLogout()}>
          <FontAwesome name="sign-out" />&nbsp;Logout
        </Button>
      </Layout>
    </Layout>
  </ToolbarGroup>
);

export default UserBlock;
