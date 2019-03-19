import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'redux/store';
import Films from 'components/Movies';
import ModalsFragment from 'containers/ModalsFragment';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

const store = configureStore();

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Films} />
          <Redirect to="/" />
        </Switch>
      </ConnectedRouter>
      <ModalsFragment />
    </Provider>
  </MuiThemeProvider>
);

export default hot(module)(App);
