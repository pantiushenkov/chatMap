import React from 'react'
import {chatActions} from "src/screens/Chat/ChatReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import ChatEngineInit from 'chat-engine';

const ChatEngine = ChatEngineInit.create({
  publishKey: 'pub-c-fd2c86fc-9624-41a1-97af-66674327f92a',
  subscribeKey: 'sub-c-738a04ca-508f-11e8-98ad-ca969c41bada'
});

const now = new Date().getTime();

class ChatEngineCore extends React.Component {
  componentDidMount() {
    const {chatActions, authState, navigation} = this.props;
    console.disableYellowBox = true;
    const {email: username} = authState.data.user;

    ChatEngine.connect(username, {
      username,
      signedOnTime: now,
      uuid: username
    }, 'auth-key');

    ChatEngine.on('$.ready', (data) => {
      const me = data.me;
      console.log(me)
      chatActions.setData({ChatEngine, me});
      let chat = null;

      me.direct.on('$.invite', (payload) => {
        chat = new ChatEngine.Chat(payload.data.channel);
      });

    });
  }

  render() {
    return this.props.children;
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
