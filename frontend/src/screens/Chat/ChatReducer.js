import {createReducer} from "src/reducer/createReducer";

const initialState = {chat: null};

const setData = (payload) => ({
  type: 'setData',
  payload,
});

export const chatActions = {
  setData,
};

const reducers = {
  'setData': (state, payload) => ({...state, ...payload}),
  // 'setToken': (state, payload) => ({...state, token: payload.token}),
};

export default createReducer(reducers, initialState);
