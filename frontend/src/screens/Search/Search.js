import React from 'react';
import {Image, Button} from 'react-native';

class MyNotificationsScreen extends React.Component {
  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

export default MyNotificationsScreen;
