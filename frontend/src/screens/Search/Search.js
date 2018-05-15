import React, {Component} from 'react';

import {cs} from "src/styles/CommonStyles";
import {StyleSheet, TextInput, View, Text, ScrollView} from "react-native";
import {searchActions} from "../Search/SearchReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Chat from "../Chat/Chat";
import DialogScrollList from "../Chat/DialogsPage/DialogList";

const WAIT_INTERVAL = 1000;

class Search extends Component {
  state = {
    value: '',
  };

  componentWillMount() {
    this.timer = null;
  }

  handleChange = (value) => {
    clearTimeout(this.timer);

    this.setState({value});

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  triggerChange = () => {
    const {value} = this.state;

    const {searchActions} = this.props;
    searchActions.search({id: value})
  }

  render() {
    const {data: {chat, user}} = this.props.searchState;
    const {value} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.textBlock}>
            <Text style={styles.text}>Search global chats or users</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChange}
            autoCapitalize="none"
            value={value}
          />
        </View>
        <ScrollView>
          <DialogScrollList list={chat} dialogItem={true}/>
          <DialogScrollList list={user} dialogItem={false}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: cs.primaryColor
  },
  textBlock: {
    alignItems: 'center',
    marginVertical: 10
  },
  input: {
    height: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  text: {
    fontWeight: "bold",
    fontSize: 16
  }
});

export default connect(
  ({searchState}) => ({
    searchState
  }),
  (dispatch) => ({
    searchActions: bindActionCreators(searchActions, dispatch),
  })
)(Search);

