import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class DialogItem extends Component {
  render() {
    const {item, editing, dialogItem} = this.props;

    const name = dialogItem ? item.name : item.email;

    return (
      <View style={styles.block}>
        <View style={[styles.iconBlock, editing ? styles.iconBlockShow : null]}>
          <Icon.Button
            name="circle-with-minus"
            backgroundColor={'#fff'}
            color={'black'}
            size={25}
            onPress={this.onClick}/>
        </View>
        <View style={styles.innerBlock}>
          <Text style={styles.header}>{name}</Text>
          <Text style={styles.text}>{dialogItem ? 'public chat' : 'private chat'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: "black",
  },
  block: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 70,
    marginBottom: 2,
  },
  header: {
    fontSize: 21,
    fontWeight: '600',
    color: "black",
  },
  iconBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: -40,
  },
  iconBlockShow: {
    marginLeft: 0,
  },
  innerBlock: {
    flex: 1,
    marginTop: 4,
  }
});
