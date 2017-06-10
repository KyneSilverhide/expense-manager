import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { green, brown, red } from 'material-ui/styles/colors';
import Grid from 'material-ui/Grid';
import AppNavigation from '../containers/AppNavigation.js';

injectTapEventPlugin();

const palette = createPalette({
  primary: brown,
  accent: green,
  erorr: red,
  type: 'light',
});

const { styleManager, theme } = MuiThemeProvider.createDefaultContext({
  theme: createMuiTheme({ palette }),
});

const App = ({ children }) => (
  <MuiThemeProvider theme={theme} styleManager={styleManager}>
    <Grid container>
      <AppNavigation />
      <Grid id="app-content" item xs={12}>
        {children}
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
