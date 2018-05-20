import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {withNavigation} from 'react-navigation';
import MaterialInitials from 'react-native-material-initials/native';
import {cs} from "../../../styles/CommonStyles";
import {getChatName} from "src/services/getChatName";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {messageActions} from "../Messages/MessagesReducer";

@withNavigation
class DialogItem extends Component {
  onPress = () => {
    const {item: chat, navigation} = this.props;

    const chatName = getChatName(chat);
    navigation.navigate('Chat', {chat, chatName});
  }

  render() {
    const {item: chat, editing} = this.props;
    const chatName = getChatName(chat);
    const unreadCount = chat.unreadCount;

    return (
      <View style={styles.block}>
        <View style={[styles.iconBlock, editing ? styles.iconBlockShow : null]}>
          <Icon.Button
            name="circle-with-minus"
            backgroundColor={'#fff'}
            color={'black'}
            size={25}
          />
        </View>
        <View style={styles.innerContainer}>
          <View style={[styles.innerBlock, {flexGrow: 4}]}>
            <TouchableOpacity onPress={this.onPress}>
              <View style={styles.innerContainer}>
                <View style={styles.iconBlockShow}>
                  <MaterialInitials
                    style={{alignSelf: 'center'}}
                    backgroundColor={cs.primaryColor}
                    color={'white'}
                    size={40}
                    text={chatName}
                    single={true}
                  />
                </View>
                <View style={styles.innerBlock}>
                  <Text style={styles.header}>{chatName}</Text>
                  <Text style={styles.text}>{'public chat'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.innerBlock, styles.innerBlockUnread]}>
            <View style={unreadCount ? styles.unreadCountWrapper : ''}>
              <Text style={unreadCount ? styles.unreadCount : ''}>{unreadCount === 0 ? null : unreadCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


export default connect(
  ({chatState}) => ({
    chats: chatState.chats
  }),
  (dispatch) => ({
    messageActions: bindActionCreators(messageActions, dispatch),
  })
)(DialogItem);

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  innerContainerCenter: {
    flexGrow: 2,
    alignItems: "center"
  },
  container: {
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: "black",
  },
  unreadCount: {
    color: 'white',
  },
  unreadCountWrapper: {
    borderColor: 'black',
    minWidth: 20,
    borderRadius: 15,
    backgroundColor: "#D02129",
    justifyContent: "center",
    padding: 5,
    flexDirection: 'row',
    marginLeft: 30,
  },
  block: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 70,
    marginBottom: 2,
  },
  header: {
    fontSize: 21,
    fontWeight: '600',
    color: "black",
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
    marginLeft: -40,
  },
  iconBlockShow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
    marginLeft: -10,
    marginTop: 10,
    marginRight: 10,
  },
  innerBlock: {
    flex: 1,
    marginTop: 4,
  },
  innerBlockUnread: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
