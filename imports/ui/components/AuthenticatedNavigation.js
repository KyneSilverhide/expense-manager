import React from 'react';
import Button from 'material-ui/Button';
import ToolbarGroup from 'material-ui/Toolbar';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

const AuthenticatedNavigation = () => (
  <ToolbarGroup>
    <Link to="/events">
      <Button color="contrast">
        <FontAwesome name="calendar" />&nbsp;Events
      </Button>
    </Link>
    <Link to="/friends">
      <Button color="contrast">
        <FontAwesome name="users" />&nbsp;Friends
      </Button>
    </Link>
  </ToolbarGroup>
);

export default AuthenticatedNavigation;
