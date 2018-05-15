import {createReducer} from "src/reducer/createReducer";
import {post} from 'src/services/Request'
import {AsyncStorage} from "react-native";
import axios from 'src/services/Axios';

const initialState = {
  data: {
    chat: [],
    user: []
  }
};

const SEARCH = 'SEARCH';

const search = payload => async (dispatch) => {
  const response = await post('search', payload);

  dispatch({
    type: SEARCH,
    payload: response,
  });
};

export const searchActions = {
  search,
};

const reducers = {
  [SEARCH]: (state, payload) => ({...state, ...payload})
};

export default createReducer(reducers, initialState);
