import React from 'react'
import {chatActions} from "src/screens/Chat/ChatReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ChatEngineInit from 'chat-engine';

const ChatEngine = ChatEngineInit.create({
  publishKey: 'pub-c-40a833bf-50ca-44b2-8584-5336b714a54c',
  subscribeKey: 'sub-c-84f074fa-2bbf-11e8-9322-6e836ba663ef'
});

const now = new Date().getTime();

class ChatEngineCore extends React.Component {
  componentDidMount() {
    const {chatActions, authState} = this.props;
    console.disableYellowBox = true;
    const {email: username} = authState.data.user;

    ChatEngine.connect(username, {
      username,
      signedOnTime: now,
      uuid: username
    }, 'auth-key');

    ChatEngine.on('$.ready', (data) => {
      chatActions.setData({ChatEngine, me: data.me})
    });
  }

  render() {
    const {children} = this.props;
    return children;
  }
}

export default connect(
  ({chatState, authState}) => ({
    chatState, authState
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(ChatEngineCore);
