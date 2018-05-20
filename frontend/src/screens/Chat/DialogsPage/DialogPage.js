import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Entypo';

import {Text, View, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {chatActions} from '../ChatReducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DialogList from "./DialogList";
import DialogItem from "./DialogItem";
import {cs} from "../../../styles/CommonStyles";

class ChatDialogs extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    const {editing} = state.params || false;
    return {
      gesturesEnabled: false,
      title: "Chats",
      headerLeft: (
        editing ?
          (<Button
              title={"Done"}
              color="black"
              onPress={() => navigation.setParams({editing: false})}/>
          ) : (<Icon.Button
              name="ios-create-outline"
              backgroundColor='transparent'
              color="black" size={30}
              underlayColor='transparent'
              style={{marginLeft: 10}}
              onPress={() => navigation.setParams({editing: true})}/>
          )
      ),
      headerRight: (
        <IconO.Button
          name="plus"
          backgroundColor='transparent'
          color="black" size={30}
          underlayColor='transparent'
          onPress={() => navigation.navigate('AddPublicChat')}/>
      ),
    };
  };

  render() {

    const {navigation, chats} = this.props;
    const {state} = navigation;
    const {editing} = state.params || false;

    return (
      <ScrollView style={styles.container}>
        <DialogList list={chats} editing={editing} dialogItem={true}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default connect(
  ({chatState, authState}) => ({
    chats: chatState.chats,
    authState,
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(ChatDialogs);
