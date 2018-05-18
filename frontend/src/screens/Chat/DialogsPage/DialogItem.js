import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {withNavigation} from 'react-navigation';
import MaterialInitials from 'react-native-material-initials/native';
import {cs} from "../../../styles/CommonStyles";

@withNavigation
export default class DialogItem extends Component {
  render() {
    const {item, editing, navigation} = this.props;
    const chatName = item.name;

    return (
      <View style={styles.block}>
        <View style={[styles.iconBlock, editing ? styles.iconBlockShow : null]}>
          <Icon.Button
            name="circle-with-minus"
            backgroundColor={'#fff'}
            color={'black'}
            size={25}
          />
        </View>
        <View style={styles.innerBlock}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat', {chatName})}>
            <View style={styles.innerContainer}>
              <View style={styles.iconBlockShow}>
                <MaterialInitials
                  style={{alignSelf: 'center'}}
                  backgroundColor={cs.primaryColor}
                  color={'white'}
                  size={40}
                  text={chatName}
                  single={true}
                />
              </View>
              <View style={styles.innerBlock}>
                <Text style={styles.header}>{chatName}</Text>
                <Text style={styles.text}>{'public chat'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
    marginLeft: -40,
  },
  iconBlockShow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
    marginLeft: -10,
    marginTop: 10,
    marginRight: 10,
  },
  innerBlock: {
    flex: 1,
    marginTop: 4,
  }
});
