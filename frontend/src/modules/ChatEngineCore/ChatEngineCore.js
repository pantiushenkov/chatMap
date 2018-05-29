import React from 'react'
import {chatActions} from "src/screens/Chat/ChatReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import ChatEngineInit from 'chat-engine';
import unreadMessages from "chat-engine-unread-messages";
import {messageActions} from "../../screens/Chat/Messages/MessagesReducer";

const ChatEngine = ChatEngineInit.create({
  publishKey: 'pub-c-fd2c86fc-9624-41a1-97af-66674327f92a',
  subscribeKey: 'sub-c-738a04ca-508f-11e8-98ad-ca969c41bada',
  secretKey: 'sec-c-MDBlOGJjYmEtMjc3YS00NjFiLWE3OWQtZThiNGMyNmQ4NTVm'
});

const now = new Date().getTime();

class ChatEngineCore extends React.Component {
  initializeChat = (chatName) => {
    const {chatActions} = this.props;
    const chat = new ChatEngine.Chat(chatName);

    chat.plugin(unreadMessages());

    chat.on('$.connected', () => {

      chat.unreadMessages.inactive();

      console.log('chat.unread', chat.unread);

      chat.on('$unread', (payload) => {
        // chatActions.initChat({chat: payload.chat, chatName});
      });

      chatActions.initChat({chat, chatName});
    })
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    console.disableYellowBox = true;

    const {chatActions, authState} = this.props;
    const {email: username, chats} = authState.data.user;

    ChatEngine.connect(username, {
      username,
      signedOnTime: now,
      uuid: username
    }, 'auth-key');


    ChatEngine.on('$.ready', (data) => {
        const me = data.me;
        const pubnub = ChatEngine.pubnub;


        pubnub.addListener({
          message: (response) => {
            console.log(response);
            if (response.channel === 'eon-map-geolocation-output') {
              const {publisher, timetoken, ...geolocation} = response.message;
              if (publisher === me.uuid) {
                console.log(geolocation);
                me.update({geolocation: geolocation[Object.keys(geolocation)[0]].data})
              }
            }
          }
        });


      pubnub.subscribe({
          channels: ['eon-map-geolocation-output', 'pubnub-gif-chat'],
        });

        chats.map(({id}) => this.initializeChat(id));

        chatActions.setData({ChatEngine, me});

        me.direct.on('$.invite', (payload) => {
          // chat = new ChatEngine.Chat(payload.data.channel);
        });
        setTimeout(() => {

          pubnub.publish({
            channel: 'eon-maps-geolocation-input',
            message: {
              uuid: me.uuid
            }
          });
        }, 1000)
      }
    );
  }

  render() {
    return this.props.children
  }
}

export default connect(
  ({chatState, authState}) => ({
    chats: chatState.chats, authState
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch),
  })
)(ChatEngineCore);
