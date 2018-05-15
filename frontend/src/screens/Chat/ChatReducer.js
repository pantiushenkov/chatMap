import {createReducer} from "src/reducer/createReducer";
import {ADD_CHAT} from "src/reducer/GlobalConstants";
import {post} from "src/services/Request";

const initialState = {
  errors: {},
  data: {}
};

const SET_DATA = 'SET_DATA';

const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

const addChat = payload => async (dispatch) => {
  const response = await post('addChat', payload);

  dispatch({
    type: ADD_CHAT,
    payload: response
  });
};

export const chatActions = {
  addChat,
  setData,
};

const reducers = {
  [SET_DATA]: (state, {me,...payload}) => ({...state, ...payload}),
  [ADD_CHAT]: (state, payload) => ({...state, chat: payload.data.chat, ...payload}),
  // 'setToken': (state, payload) => ({...state, token: payload.token}),
};

export default createReducer(reducers, initialState);
