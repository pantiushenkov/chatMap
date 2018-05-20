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
import AddPublicChat from "src/screens/AddPublicChat/AddPublicChat";
import ChatEngineCore from "src/modules/ChatEngineCore/ChatEngineCore";
import Chat from "../screens/Chat/Chat";
import Info from "../screens/Chat/Info";
import Map from "../screens/Map/Map";

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
          <ChatEngineCore>
            <AppNavigator/>
          </ChatEngineCore> :
          <Login/>
        }
        <DeveloperMenu/>
      </View>
    )
  }
}

export const HomeStack = createStackNavigator({
  Home: {
    screen: ChatDialogs
  },
  AddPublicChat: {
    screen: AddPublicChat
  },
  Chat: {
    screen: Chat,
  },
  Info: {
    screen: Info,
  },
  Map: {
    screen: Map,
  },
});

const skipRoutes = [
  'Info', 'Chat', 'Map'
];

export const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: ({navigation}) => {
      const routes = navigation.state.routes;
      const route = routes[routes.length - 1].routeName;
      if (skipRoutes.includes(route)) {
        return {tabBarVisible: false}
      }
      return {
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
    }
  },
  Search: {
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
  ({authState, navigationState}) => ({
    authState, navigationState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(App);

