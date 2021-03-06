import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import 'typeface-roboto';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './MaterialUi/Theme';
import './MaterialUi/amends.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={2}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
