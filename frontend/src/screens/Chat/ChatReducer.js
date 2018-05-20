import {createReducer} from "src/reducer/createReducer";
import {ADD_TO_CHAT, CREATE_CHAT} from "src/reducer/GlobalConstants";
import {post} from "src/services/Request";

const initialState = {
  errors: {},
  data: {},
  chats: {},
};

const SET_DATA = 'SET_DATA';
const INIT_CHAT = 'INIT_CHAT';

const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

const createChat = payload => async (dispatch) => {
  const response = await post('createChat', payload);

  dispatch({
    type: CREATE_CHAT,
    payload: response
  });
};

const addToChat = payload => async (dispatch) => {
  const response = await post('addChat', payload);

  dispatch({
    type: ADD_TO_CHAT,
    payload: response
  });
};

const initChat = payload => ({
  type: INIT_CHAT,
  payload
})

export const chatActions = {
  createChat,
  addToChat,
  setData,
  initChat,
};

const reducers = {
  [SET_DATA]: (state, {me, ...payload}) => ({...state, ...payload}),
  [CREATE_CHAT]: (state, payload) => ({...state, chat: payload.data ? payload.data.chat : state.data.chat, ...payload}),
  [ADD_TO_CHAT]: (state, payload) => ({...state, user: payload.data ? payload.data.user : state.data.user, ...payload}),
  [INIT_CHAT]: (state, {chat, chatName}) => ({...state, chats: {...state.chats, [chatName]: chat}}),
};


export default createReducer(reducers, initialState);
