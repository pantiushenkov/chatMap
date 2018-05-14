import React from 'react';
import {AsyncStorage, Image, StyleSheet, View} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import Login from "src/screens/Auth/Auth";
import {authActions} from "src/screens/Auth/AuthReducer";
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import ChatDialogs from "src/screens/Chat/DialogsPage/DialogPage";
import DeveloperMenu from "../services/DeveloperMenu";
import Search from "../screens/Search/Search";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {cs} from 'src/styles/CommonStyles';

class App extends React.Component {
  async componentDidMount() {
    const {authActions} = this.props;
    const token = await AsyncStorage.getItem('token');

    if (token) {
      authActions.getMe(token);
    }
  }

  render() {
    const {data: {token}} = this.props.authState;
    return (
      <View style={styles.container}>
        {token ?
          <AppNavigator/> :
          <Login/>
        }
        <DeveloperMenu/>
      </View>
    )
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: ChatDialogs
  },
  // Add: {
  //   screen: AddScreen
  // },
})

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Chats',
      tabBarIcon: ({focused}) => (
        <Icon
          name="ios-chatbubbles"
          backgroundColor='red'
          color={focused ? 'black' : 'grey'} size={30}
          underlayColor='black'
        />
      ),
    }
  },
  Notifications: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({focused}) => (
        <MaterialCommunityIcons
          name="account-search"
          color={focused ? 'black' : 'grey'} size={30}
          underlayColor='transparent'
        />
      )
    }
  },
}, {
  animationEnabled: true,
  tabBarOptions: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default connect(
  ({authState}) => ({
    authState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(App);

