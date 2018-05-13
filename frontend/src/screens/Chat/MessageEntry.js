import React, {Component} from "react";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import TypingIndicator from "./TypingIndicator";

import {Icon} from "react-native-elements";

export class MessageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: "",
    };
  }

  sendChat = () => {
    const {chatInput} = this.state;
    if (chatInput) {
      this.props.chat.emit("message", {
        text: chatInput
      });
      this.setState({chatInput: ""});
    }
  };

  setChatInput = (value) => {
    this.setState({chatInput: value});
    const {typingIndicator, chat} = this.props;
    if (typingIndicator) {
      if (value !== "") {
        chat.typingIndicator.startTyping();
      } else {
        chat.typingIndicator.stopTyping();
      }
    }
  };

  onTypingIndicator = () => {
    if (this.props.typingIndicator) {
      return <TypingIndicator chat={this.props.chat}/>;
    }
  };

  render() {
    const {chatInput} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={this.props.keyboardVerticalOffset || 0}>
        {this.onTypingIndicator()}
        <View style={styles.footer}>
          <TextInput
            value={chatInput}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Send Message"
            onChangeText={this.setChatInput}
            onSubmitEditing={this.sendChat}
          />
          <TouchableOpacity
            style={{backgroundColor: "#D02129"}}
            onPress={this.sendChat}
          >
            <Icon
              reverse
              name="send"
              size={14}
              color="#D02129"
              style={styles.send}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    padding: 10
  }
});
