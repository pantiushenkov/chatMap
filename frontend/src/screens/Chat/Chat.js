import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {View} from 'react-native';
import ChatEngineCore from 'chat-engine';
import typingIndicator from 'chat-engine-typing-indicator';

import {MessageList} from 'chat-engine-react-native';
import styles from 'src/styles/CommonStyles'
import {MessageEntry} from "src/screens/Chat/MessageEntry";

import search from 'chat-engine-online-user-search';
import DeveloperMenu from "../../services/DeveloperMenu";
import LoadingIndicator from "../../modules/LoadingIndicator/LoadingIndicator";
import {chatActions} from "./ChatReducer";

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-40a833bf-50ca-44b2-8584-5336b714a54c',
  subscribeKey: 'sub-c-84f074fa-2bbf-11e8-9322-6e836ba663ef'
});

const now = new Date().getTime();

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
    console.log(username)
    ChatEngine.connect(username, {
      username,
      signedOnTime: now,
      uuid: username
    }, 'auth-key');

    ChatEngine.on('$.ready', (data) => {

        const me = data.me;
        // console.log(me);

        const chat = new ChatEngine.Chat('ForthChat');

        chat.plugin(typingIndicator({timeout: 5000})); //set this if you want your message entry to have a typing indicator
        chat.plugin(search());

        chat.on('$.connected', (data) => {
          // console.log(data.chat.onlineUserSearch.search('s'))
          const {chatActions} = this.props;
          chatActions.setData({chat: data.chat, me});
          // this.setState({chat: data.chat, renderChat: true, me});
        })
      }
    );
  }

  render() {
    const {me, chat} = this.props.chatState;

    return (
      <View style={styles.container}>
        {chat ? (
          <View style={{flex: 1}}>
            <MessageList chat={chat} me={me}/>
            <MessageEntry chat={chat} typingIndicator/>
          </View>
        ) : (
          <LoadingIndicator target={'chat'}/>
        )}
        <DeveloperMenu/>
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
