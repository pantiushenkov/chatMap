import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import MaterialInitials from 'react-native-material-initials/native';
import {cs} from "../../styles/CommonStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {chatActions} from "../../screens/Chat/ChatReducer";

@withNavigation
class UserItem extends Component {
  onPress = () => {
    const {item: {email}, navigation, invite, chatState, authState} = this.props;
    if (invite) {
      const user = chatState.ChatEngine.users[email];
      console.log(user);
      chatState.chat.invite(user);
    } else {
       // navigation.navigate('Chat', {});
    }
  }

  render() {
    const {item: {email}} = this.props;

    return (
      <View style={styles.block}>
        <View style={styles.iconBlock}>
          <MaterialInitials
            style={{alignSelf: 'center'}}
            backgroundColor={cs.primaryColor}
            color={'white'}
            size={30}
            text={email}
            single={true}
          />
        </View>
        <View style={styles.innerBlock}>
          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.text}>{email}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  ({chatState, authState}) => ({
    chatState, authState
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(UserItem);

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '500',
    color: "black",
    paddingTop: 3,
  },
  block: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: cs.primaryColor
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  innerBlock: {
    flex: 1,
    marginTop: 4,
  }
});
