import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {StyleSheet, View, ScrollView, FlatList, Text, Animated} from "react-native";
import {authActions} from "../Auth/AuthReducer";

class TypingIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTyping: false,
      userTyping: "",
    };
  }

  componentDidMount() {
    this.props.chat.on('$typingIndicator.startTyping', (payload) => {
      this.setState({isTyping: true, userTyping: payload.sender.uuid})
    });

    this.props.chat.on('$typingIndicator.stopTyping', () => {
      this.setState({isTyping: false});
    });
  }

  renderTypingIndicator() {
    const {isTyping, userTyping} = this.state;
    const {me} = this.props.chatState;

    if (isTyping && me.uuid !== userTyping) {
      return (<View><Text> {userTyping} is typing... </Text></View>);
    }
  }

  render() {
    return (
      <View style={styles.background}>
        {this.renderTypingIndicator()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(
  ({chatState}) => ({
    chatState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(TypingIndicator);
