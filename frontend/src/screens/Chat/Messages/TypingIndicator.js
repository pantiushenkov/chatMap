import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {StyleSheet, View, Text} from "react-native";
import {authActions} from "../../Auth/AuthReducer";

class TypingIndicator extends Component {
  state = {
    isTyping: false,
    userTyping: "",
  };

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
    const {me} = this.props.authState;

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
  ({chatState, authState}) => ({
    chatState, authState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(TypingIndicator);
