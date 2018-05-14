import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DialogItemEdit extends Component {

  render() {
    const {text, onRemove} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconBlock}>
          <Icon.Button
            name="ios-remove-circle"
            backgroundColor="rgba(0, 0, 0, 0)"
            color="red" size={30}
            onPress={onRemove}/>
        </View>
        <View style={styles.innerBlock}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  text: {
    fontSize: 21,
    fontWeight: '500'
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  innerBlock: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  }
});
