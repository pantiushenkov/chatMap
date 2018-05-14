import React from 'react';
import {authActions} from "../Auth/AuthReducer";
import {bindActionCreators} from "redux/index";
import {connect} from "react-redux";

class AddChat extends React.Component {
  render() {
    return (
      null
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
)(AddChat);
