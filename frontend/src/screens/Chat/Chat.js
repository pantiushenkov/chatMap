import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {KeyboardAvoidingView, StyleSheet, TouchableOpacity, View} from 'react-native';
import typingIndicator from 'chat-engine-typing-indicator';
import search from 'chat-engine-online-user-search';
import {MessageList} from 'chat-engine-react-native';
import {MessageEntry} from "src/screens/Chat/MessageEntry";

import LoadingIndicator from "../../modules/LoadingIndicator/LoadingIndicator";
import {chatActions} from "./ChatReducer";
import MaterialInitials from 'react-native-material-initials/native';
import {withNavigation} from "react-navigation";
import {cs} from "../../styles/CommonStyles";
import emoji from "chat-engine-emoji";

@withNavigation
class Chat extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state, navigate} = navigation;
    return {
      title: state.params.chatName,
      headerRight:
        (
          <TouchableOpacity onPress={() => navigate('Info')}>
            <MaterialInitials
              style={{alignSelf: 'center', marginRight: 10}}
              backgroundColor={cs.primaryColor}
              color={'white'}
              size={30}
              text={state.params.chatName}
              single={true}
            />
          </TouchableOpacity>)
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null,
    };
  }

  componentDidMount() {
    const {chatState, navigation, authState, chatActions} = this.props;
    const {chatName, email} = navigation.state.params;
    const {me} = authState;
    const {ChatEngine} = chatState;

    if (!authState.data.user.chats.filter(a => a.name === (chatName))[0]) {
      chatActions.addToChat({
        id: chatName ? chatName : me.uuid + '-' + email,
        name: chatName ? chatName : email,
        publicChat: !!chatName,
      })
    }

    const chat = new ChatEngine.Chat(chatName);

    chat.plugin(typingIndicator({timeout: 5000}));

    chat.plugin(emoji());

    chat.on('$.connected', (data) => {
      setTimeout(() => {
        chatActions.setData({chat: data.chat});
        // console.log('invite Nik');
        // chat.invite('Nik');

        chat.on('$.online.*', (data) => {
          console.log('$.online.*', data);
        });

// when a user goes offline, remove them from the online list
        chat.on('$.offline.*', (data) => {
          console.log('$.offline.*', data);
        });
      }, 0);
      // chatActions.setData({chat: data.chat});
      this.setState({chat, renderChat: true, me});
    })
  }

  render() {
    const {me} = this.props.chatState;
    const {chat} = this.state;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={-126}
      >
        {chat ? (
          <View style={{height: '100%', display: 'flex'}}>
            <MessageList chat={chat} me={me}/>
            <MessageEntry chat={chat} typingIndicator/>
          </View>
        ) : (
          <LoadingIndicator target={'chat'}/>
        )}
      </KeyboardAvoidingView>
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
