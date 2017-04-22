import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { teal, red } from 'material-ui/styles/colors';
import Layout from 'material-ui/Layout';
import AppNavigation from '../containers/AppNavigation.js';

injectTapEventPlugin();

const palette = createPalette({
  primary: teal,
  accent: red,
  type: 'light',
});

const { styleManager, theme } = MuiThemeProvider.createDefaultContext({
  theme: createMuiTheme({ palette }),
});


const App = ({ children }) => (
  <MuiThemeProvider theme={theme} styleManager={styleManager}>
    <Layout container>
      <AppNavigation/>
      <Layout id="app-content" item xs={12}>
        {children}
      </Layout>
    </Layout>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
