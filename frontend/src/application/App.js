import React from 'react';
import {AsyncStorage, View} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import Chat from "src/screens/Chat/Chat";
import Login from "src/screens/Auth/Auth";
import {authActions} from "src/screens/Auth/AuthReducer";
import LoadingIndicator from "src/modules/LoadingIndicator/LoadingIndicator";
import DeveloperMenu from "../services/DeveloperMenu";

class App extends React.Component {
  async componentDidMount() {
    const {authActions} = this.props;
    const token = await AsyncStorage.getItem('token');

    if (token) {
      authActions.getMe(token);
    }
  }

  render() {
    const {data: {token}} = this.props.authState;
    return (
      token ?
        <Chat/> :
        <Login/>
    )
  }
}

export default connect(
  ({authState}) => ({
    authState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(App);

