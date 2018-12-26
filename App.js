import React, { Component } from 'react';
import {AppWithNavigationState} from './Containers/AppContainer';
import { Provider } from 'react-redux';
import configureStore from './Configs/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}