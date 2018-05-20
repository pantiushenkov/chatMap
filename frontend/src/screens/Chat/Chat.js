import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {KeyboardAvoidingView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {MessageList} from 'chat-engine-react-native';
import {MessageEntry} from "src/screens/Chat/Messages/MessageEntry";

import LoadingIndicator from "../../modules/LoadingIndicator/LoadingIndicator";
import {chatActions} from "./ChatReducer";
import MaterialInitials from 'react-native-material-initials/native';
import {withNavigation} from "react-navigation";
import {cs} from "../../styles/CommonStyles";
import emoji from "chat-engine-emoji";
import typingIndicator from "chat-engine-typing-indicator";

@withNavigation
class Chat extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state, navigate} = navigation;
    const {chat, chatName} = state.params;
    return {
      title: chatName,
      headerRight:
        (
          <TouchableOpacity onPress={() => navigate('Info', {chat, chatName})}>
            <MaterialInitials
              style={{alignSelf: 'center', marginRight: 10}}
              backgroundColor={cs.primaryColor}
              color={'white'}
              size={30}
              text={chatName}
              single={true}
            />
          </TouchableOpacity>
        )
    }
  };

  componentWillUnmount() {
    const {navigation} = this.props;
    const {chat} = navigation.state.params;
    chat.unreadMessages.inactive();
  }

  componentDidMount() {
    // if (!authState.data.user.chats.filter(a => a.name === (chatName))[0]) {
    //   chatActions.addToChat({
    //     id: chatName ? chatName : me.uuid + '-' + email,
    //     name: chatName ? chatName : email,
    //     publicChat: !!chatName,
    //   })
    // }
    const {navigation} = this.props;
    const {chat} = navigation.state.params;
    chat.plugin(emoji());
    chat.plugin(typingIndicator({timeout: 5000}));
    chat.unreadMessages.active();
    console.log(chat)
    chat.unreadCount = 0;
    console.log(chat)
  }

  render() {
    const {me, navigation} = this.props;
    const {chat} = navigation.state.params;
    console.log(this.props);

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
  ({authState}) => ({
    me: authState.me,
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(Chat);
