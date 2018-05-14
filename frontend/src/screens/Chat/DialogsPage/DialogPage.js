import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Entypo';

import {Text, View, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {chatActions} from '../ChatReducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DialogItem from './DialogItem';
import {cs} from 'src/styles/CommonStyles';

const dialogs = [
  {
    id: 1,
    text: "Milk",
    toBuy: true
  },
  {
    id: 2,
    text: "Eggs Medium 12 pack",
    toBuy: false
  },
];


class ChatDialogs extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state, setParams} = navigation;
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
          onPress={() => navigation.navigate('Add')}/>
      ),
    };
  };

  render() {
    const {state, setParams} = this.props.navigation;
    const {editing} = state.params || false;

    return (
      <ScrollView style={styles.list}>
        <View style={styles.list}>
          {dialogs.map(item => <DialogItem
            editing={editing}
            key={item.id}
            item={item}
            onOpen={(bool) => this.onOpen(bool, item.id)}
          />)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: cs.primaryColor,
  }
});

export default connect(
  ({chatState, authState}) => ({
    chatState,
    authState,
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(ChatDialogs);
