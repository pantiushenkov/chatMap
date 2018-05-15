import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {View} from 'react-native';
import typingIndicator from 'chat-engine-typing-indicator';

import {MessageList} from 'chat-engine-react-native';
import styles from 'src/styles/CommonStyles'
import {MessageEntry} from "src/screens/Chat/MessageEntry";

import search from 'chat-engine-online-user-search';
import LoadingIndicator from "../../modules/LoadingIndicator/LoadingIndicator";
import {chatActions} from "./ChatReducer";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null,
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    console.disableYellowBox = true;
    const {email: username} = this.props.authState.data.user;

    ChatEngine.connect(username, {
      username,
      signedOnTime: now,
      uuid: username
    }, 'auth-key');

    ChatEngine.on('$.ready', (data) => {
        console.log(data);
        const me = data.me;
        // console.log(me);
        const chatName = 'ForthChat';
        const chat = new ChatEngine.Chat(chatName, false);

        chat.plugin(typingIndicator({timeout: 5000})); //set this if you want your message entry to have a typing indicator
        chat.plugin(search());

        chat.on('$.connected', (data) => {

          const {chatActions} = this.props;

          // console.log(data.chat.onlineUserSearch.search('s'))
          // chatActions.setData({chat: data.chat});
          this.setState({chat: data.chat, renderChat: true, me});
        })
      }
    );
  }

  render() {
    const {me, chat} = this.props.chatState;
    console.log(chat)
    return (
      <View>
        {chat ? (
          <View style={{flex: 1}}>
            <MessageList chat={chat} me={me}/>
            <MessageEntry chat={chat} typingIndicator/>
          </View>
        ) : (
          <LoadingIndicator target={'chat'}/>
        )}
      </View>
    );
  }
}

export default connect(
  ({chatState, authState}) => ({
    chatState,
    authState,
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(Chat);
