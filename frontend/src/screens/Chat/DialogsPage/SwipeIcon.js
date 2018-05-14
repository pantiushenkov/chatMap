import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


export default class SwipeIcon extends Component {
  onClick() {
    console.log('on click SwipeIcon')
  }

  render() {
    return (
      <Icon.Button
        name="circle-with-minus"
        size={30}
        onPress={this.onClick}/>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: 60,
    height: 59,
    backgroundColor: "#e0e0e0",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30
  }
});
