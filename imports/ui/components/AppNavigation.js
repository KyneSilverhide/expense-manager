import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';
import UserBlock from './UserBlock.js';

const AppNavigation = ({ hasUser }) =>
  !hasUser
    ? null
    : <AppBar>
        <Toolbar>
          <Link to="/">
            <IconButton contrast>
              <FontAwesome name="home" />
            </IconButton>
          </Link>
          <Text type="title" colorInherit>Expenses Manager</Text>
          <AuthenticatedNavigation />
          <div className="flex-spacer" />
          <UserBlock />
        </Toolbar>
      </AppBar>;

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
