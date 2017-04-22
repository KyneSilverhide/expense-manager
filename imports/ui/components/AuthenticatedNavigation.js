import React from 'react';
import Button from 'material-ui/Button';
import ToolbarGroup from 'material-ui/Toolbar';

import FontAwesome from 'react-fontawesome';

const AuthenticatedNavigation = () => (
  <ToolbarGroup>
    <Button contrast><FontAwesome name="calendar" />&nbsp;Events</Button>
    <Button contrast><FontAwesome name="users" />&nbsp;Friends</Button>
  </ToolbarGroup>
);

export default AuthenticatedNavigation;
