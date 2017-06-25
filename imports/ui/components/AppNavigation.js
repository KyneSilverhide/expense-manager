import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
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
            <IconButton color="contrast">
              <FontAwesome name="home" />
            </IconButton>
          </Link>
          <Typography type="title" color="inherit">Expenses Manager</Typography>
          <AuthenticatedNavigation />
          <div className="flex-spacer" />
          <UserBlock />
        </Toolbar>
      </AppBar>;

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
