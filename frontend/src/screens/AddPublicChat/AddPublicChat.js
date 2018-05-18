import React from 'react';
import {chatActions} from "../Chat/ChatReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {TextInput, View, Text, StyleSheet} from "react-native";
import {cs} from "src/styles/CommonStyles";
import {handleChange} from "src/components/Form/HandleChange";
import {TextButton} from "react-native-material-buttons";
import TextField from "react-native-material-textfield/src/components/field/index";

class AddPublicChat extends React.Component {
  state = {
    data: {name: ''},
    errors: {},
  };

  handleChange = handleChange.bind(this);

  componentDidMount() {
    console.log('kfioxjfoxj');
  }

  handleSubmit = () => {
    const {chatActions} = this.props;
    const {data: {name}} = this.state;
    chatActions.createChat({id: name, name, publicChat: true});
  };

  render() {
    const {data: {name}} = this.state;
    const {errors} = this.props.chatState;

    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.textBlock}>
            <Text style={styles.text}>Let`s choose a name for your public chat</Text>
          </View>
          <TextField
            label='Name'
            autoCapitalize="none"
            baseColor={cs.secondaryRedTextColor}
            textColor={cs.primaryRedTextColor}
            tintColor={cs.primaryRedTextColor}
            keyboardType={'default'}
            onChangeText={this.handleChange('name')}
            value={name}
            error={errors.name}
          />
        </View>
        <View style={styles.buttons}>
          <TextButton
            title='Create'
            titleColor={cs.primaryRedTextColor}
            disabledTitleColor={cs.secondaryRedTextColor}
            disabled={!name}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
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
  ({chatState}) => ({
    chatState
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(AddPublicChat);
