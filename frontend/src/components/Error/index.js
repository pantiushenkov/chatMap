import React from 'react';
import {View, Text} from "react-native";
import {cs} from 'src/styles/CommonStyles';

class Error extends React.Component {
  render() {
    const {message} = this.props;
    return (
      <View>
        <Text style={{color: cs.errorColor}}>{message}</Text>
      </View>
    )
  }
}

export default Error;
