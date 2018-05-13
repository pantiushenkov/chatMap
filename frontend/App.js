import React from 'react';
import {AppRegistry} from 'react-native';

import {Provider} from 'react-redux';

import store from 'src/store';
import App from "src/application/App";

export default class ChatMap extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ChatMap', () => ChatMap);
