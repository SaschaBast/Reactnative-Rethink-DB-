import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppState } from 'react-native';
import { I18nextProvider } from 'react-i18next';

import { listConversations } from './redux/actions';
import store from './redux/store';
import App from './App';
import { createWatchers , cleanWatchers } from './watchers';
import socket, { connect as connectSocket } from './Socket';
import { getI18nInstance } from './i18n';

export default class AppContainer extends Component {
  state = {
    appState: AppState.currentState // 'active', 'background', 'inactive'
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillMount() {
    store.dispatch(listConversations());
    createWatchers(store);
  }

  _handleAppStateChange = (appState) => {
    // check if appState changed to 'active'
    console.log(`app state has changed from ${this.state.appState} to ${appState}`);
    if (appState !== this.state.appState && appState === 'active') {
      // check if socket is connected
      if (!socket.connected) {
        //reconnect if socket is disconnected
        connectSocket();

        // clean watchers and subscribe again
        cleanWatchers();
        createWatchers(store);
      }
    }

    // store AppState in component's state
    this.setState({
      appState
    });
  };

  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={getI18nInstance()}>
          <App />
        </I18nextProvider>
      </Provider>
    );
  }
}
