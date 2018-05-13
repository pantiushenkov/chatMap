import {combineReducers} from 'redux';

import chatState from 'src/screens/Chat/ChatReducer';
import authState from 'src/screens/Auth/AuthReducer';
import loadingIndicatorState from 'src/modules/LoadingIndicator/LoadingIndicatorState';

const reducers = {
  chatState,
  authState,
  loadingIndicatorState
};

export default combineReducers(
  reducers,
);
