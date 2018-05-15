import {combineReducers} from 'redux';

import chatState from 'src/screens/Chat/ChatReducer';
import authState from 'src/screens/Auth/AuthReducer';
import searchState from 'src/screens/Search/SearchReducer';
import loadingIndicatorState from 'src/modules/LoadingIndicator/LoadingIndicatorState';

const reducers = {
  chatState,
  authState,
  searchState,
  loadingIndicatorState
};

export default combineReducers(
  reducers,
);
