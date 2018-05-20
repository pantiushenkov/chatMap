import {combineReducers} from 'redux';

import chatState from 'src/screens/Chat/ChatReducer';
import authState from 'src/screens/Auth/AuthReducer';
import searchState from 'src/screens/Search/SearchReducer';
import loadingIndicatorState from 'src/modules/LoadingIndicator/LoadingIndicatorState';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import messageState from 'src/screens/Chat/Messages/MessagesReducer';
import {HomeStack} from "../application/App";


const navigationState = createNavigationReducer(HomeStack);

const reducers = {
  chatState,
  authState,
  searchState,
  loadingIndicatorState,
  messageState,
  navigationState
};

export default combineReducers(
  reducers,
);
