import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {chatActions} from "./ChatReducer";
import DialogScrollList from "src/screens/Chat/DialogsPage/DialogList";
import UserItem from "../../modules/User/UserItem";
import {cs} from "../../styles/CommonStyles";
import {searchActions} from "../Search/SearchReducer";
import Icon from 'react-native-vector-icons/FontAwesome';

const WAIT_INTERVAL = 1000;

@withNavigation
class Info extends Component {
  static navigationOptions = ({navigation}) => {
    const {state, navigate} = navigation;
    const {chatName} = state.params;
    return {
      title: chatName,
      headerRight: (
        <Icon.Button
          name="map-marker"
          backgroundColor='transparent'
          color="black" size={30}
          underlayColor='transparent'
          style={{marginLeft: 10}}
          onPress={() => navigate('Map', {chatName})}
        />)
    }
  };

  state = {
    value: '',
    onlineUsers: [],
    offlineUsers: []
  };

  componentDidMount() {
    const {chatState} = this.props;
    const {chat} = chatState;
  }

  componentWillUnmount() {
    const {searchActions, searchState} = this.props;
    if (searchState.data.user) {
      searchActions.clear()
    }
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange = (value) => {
    clearTimeout(this.timer);

    this.setState({value});

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  triggerChange = () => {
    const {value} = this.state;

    const {searchActions} = this.props;
    searchActions.search({id: value, usersOnly: true})
  }

  render() {
    const {searchState, navigation} = this.props;
    const {data: {user}} = searchState;

    const {chat} = navigation.state.params;

    const chatUsers = Object.keys(chat.users).map(a => ({email: a}));

    const {value} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.text}>Members of this chat</Text>
          <View style={styles.textBlock}>
            {chatUsers.map(a => (<UserItem key={a.email} item={a}/>))}
          </View>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.textBlock}>
            <Text style={styles.text}>Add members</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChange}
            autoCapitalize="none"
            value={value}
          />
        </View>
        <ScrollView>
          <View style={styles.textBlock}>
            {user.map(a => (<UserItem invite={true} key={a.email} item={a}/>))}
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default connect(
  ({chatState, searchState}) => ({
    chatState, searchState
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
  })
)(Info);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: cs.primaryColor
  },
  textBlock: {
    alignItems: 'center',
    marginVertical: 10
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
  input: {
    height: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  innerBlock: {
    flex: 1,
    marginTop: 4,
  }
});
